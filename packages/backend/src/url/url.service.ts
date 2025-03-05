import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlRepository } from 'src/url/url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createShortUrl(createUrlDto: CreateUrlDto) {
    const { originalUrl, customSlug } = createUrlDto;

    let formattedUrl = originalUrl;
    if (
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://')
    ) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const slug = customSlug || nanoid(6);

    const [existingShortned] = await this.urlRepository.findBySlug(slug);

    if (existingShortned && customSlug) {
      throw new ConflictException('Custom slug already in use');
    }

    const result = await this.urlRepository.create({
      originalUrl: formattedUrl,
      slug,
    });

    return result[0];
  }

  async getOriginalUrl(slug: string) {
    const [url] = await this.urlRepository.findBySlug(slug);

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.urlRepository.update(url.id, {
      visits: (url.visits ?? 0) + 1,
    });

    return url.originalUrl;
  }

  async getUrlDetails(slug: string) {
    const [url] = await this.urlRepository.findBySlug(slug);

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return {
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${url.slug}`,
      slug: url.slug,
      visits: url.visits,
      createdAt: url.createdAt,
    };
  }
}
