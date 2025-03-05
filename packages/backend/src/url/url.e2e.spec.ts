import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import { AppModule } from '../app.module';
import { runMigrations } from '../../test/run-migrations';

interface UrlResponse {
  id: string;
  originalUrl: string;
  slug: string;
  visits: number;
  createdAt: string;
  updatedAt: string;
}

describe('URL Controller (e2e)', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    // Start PostgreSQL container
    postgresContainer = await new PostgreSqlContainer()
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .start();

    // Set environment variables for the test
    process.env.DATABASE_URL = postgresContainer.getConnectionUri();

    // Create a test module with our AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Run migrations on the test database
    await runMigrations(postgresContainer.getConnectionUri());
  }, 60000); // Increase timeout for container startup

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  describe('/url (POST)', () => {
    it('should create a shortened URL', async () => {
      const createUrlDto = {
        originalUrl: 'https://example.com',
        customSlug: 'test-slug',
      };
      const response = await request(app.getHttpServer())
        .post('/shorten')
        .send(createUrlDto)
        .expect(201);

      const urlResponse = response.body as UrlResponse;

      expect(urlResponse).toHaveProperty(
        'originalUrl',
        createUrlDto.originalUrl,
      );
      expect(urlResponse).toHaveProperty('slug', createUrlDto.customSlug);
    });

    it('should generate a slug if not provided', async () => {
      const createUrlDto = {
        originalUrl: 'https://example.com/another-page',
      };

      const response = await request(app.getHttpServer())
        .post('/shorten')
        .send(createUrlDto)
        .expect(201);

      const urlResponse = response.body as UrlResponse;
      expect(urlResponse).toHaveProperty(
        'originalUrl',
        createUrlDto.originalUrl,
      );
      expect(urlResponse).toHaveProperty('slug');
      expect(urlResponse.slug).toBeTruthy();
    });

    it('should reject invalid URLs', async () => {
      const createUrlDto = {
        originalUrl: 'not-a-valid-url',
      };

      await request(app.getHttpServer())
        .post('/shorten')
        .send(createUrlDto)
        .expect(400);
    });
  });

  describe('/url/:slug (GET)', () => {
    it('should retrieve a URL by slug', async () => {
      // First create a URL
      const createUrlDto = {
        originalUrl: 'https://example.com/get-test',
        customSlug: 'get-test-slug',
      };

      await request(app.getHttpServer())
        .post('/shorten')
        .send(createUrlDto)
        .expect(201);

      // Then retrieve it by slug
      const response = await request(app.getHttpServer())
        .get(`/shorten/${createUrlDto.customSlug}/details`)
        .expect(200);

      const urlResponse = response.body as UrlResponse;
      expect(urlResponse).toHaveProperty(
        'originalUrl',
        createUrlDto.originalUrl,
      );
      expect(urlResponse).toHaveProperty('slug', createUrlDto.customSlug);
    });

    it('should return 404 for non-existent slug', async () => {
      await request(app.getHttpServer())
        .get('/shorten/non-existent-slug/details')
        .expect(404);
    });
  });

  describe('/:slug (GET)', () => {
    it('should redirect to the original URL and increment visit count', async () => {
      // First create a URL
      const createUrlDto = {
        originalUrl: 'https://example.com/redirect-test',
        customSlug: 'redirect-test-slug',
      };

      await request(app.getHttpServer())
        .post('/shorten')
        .send(createUrlDto)
        .expect(201);

      // Then try to access it via the redirect endpoint
      await request(app.getHttpServer())
        .get(`/shorten/${createUrlDto.customSlug}`)
        .expect(302) // 302 is the redirect status code
        .expect('Location', createUrlDto.originalUrl);

      // Check that the visit count was incremented
      const response = await request(app.getHttpServer())
        .get(`/shorten/${createUrlDto.customSlug}/details`)
        .expect(200);

      const urlResponse = response.body as UrlResponse;
      expect(urlResponse).toHaveProperty('visits', 1);
    });

    it('should return 404 for non-existent slug redirect', async () => {
      await request(app.getHttpServer())
        .get('/shorten/non-existent-redirect-slug')
        .expect(404);
    });
  });
});
