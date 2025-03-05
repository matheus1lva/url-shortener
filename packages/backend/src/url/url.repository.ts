import { Inject, Injectable } from '@nestjs/common';
import { Url, UrlInsert, urlTable } from 'schema';
import { DATABASE_PROVIDER, Database } from 'src/database/database.provider';
import { eq } from 'drizzle-orm';

@Injectable()
export class UrlRepository {
  constructor(
    @Inject(DATABASE_PROVIDER)
    private readonly database: Database,
  ) {}

  create(input: UrlInsert) {
    return this.database.insert(urlTable).values(input).returning();
  }

  findBySlug(slug: string) {
    return this.database
      .select()
      .from(urlTable)
      .where(eq(urlTable.slug, slug))
      .limit(1);
  }

  update(id: string, input: Partial<Url>) {
    return this.database
      .update(urlTable)
      .set(input)
      .where(eq(urlTable.id, id))
      .returning();
  }
}
