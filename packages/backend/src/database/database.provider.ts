import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from '../../schema';

export const DATABASE_PROVIDER = 'DATABASE_PROVIDER';
export const PG_POOL_PROVIDER = 'PG_POOL_PROVIDER';

export const databaseProvider = [
  {
    provide: PG_POOL_PROVIDER,
    useFactory: (configService: ConfigService) => {
      return new Pool({
        connectionString: configService.get<string>('DATABASE_URL'),
      });
    },
    inject: [ConfigService],
  },
  {
    provide: DATABASE_PROVIDER,
    useFactory: (pool: Pool) => {
      return drizzle({
        client: pool,
        schema: schemas,
      });
    },
    inject: [PG_POOL_PROVIDER],
  },
];

export type Database = NodePgDatabase<typeof schemas>;
