import {
  Module,
  Global,
  OnModuleDestroy,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
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
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(PG_POOL_PROVIDER)
    private readonly client: Pool,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
