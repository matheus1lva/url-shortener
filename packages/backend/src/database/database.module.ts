import { Module, Global, Inject, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import {
  databaseProvider,
  DATABASE_PROVIDER,
  PG_POOL_PROVIDER,
} from 'src/database/database.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...databaseProvider],
  exports: [DATABASE_PROVIDER],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(
    @Inject(PG_POOL_PROVIDER)
    private readonly pool: Pool,
  ) {}

  async onApplicationShutdown() {
    try {
      await this.pool.end();
    } catch (e) {
      console.error(e);
    }
  }
}
