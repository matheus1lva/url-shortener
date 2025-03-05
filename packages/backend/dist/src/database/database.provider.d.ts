import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from '../../schema';
export declare const DATABASE_PROVIDER = "DATABASE_PROVIDER";
export declare const PG_POOL_PROVIDER = "PG_POOL_PROVIDER";
export declare const databaseProvider: ({
    provide: string;
    useFactory: (configService: ConfigService) => Pool;
    inject: (typeof ConfigService)[];
} | {
    provide: string;
    useFactory: (pool: Pool) => NodePgDatabase<typeof schemas> & {
        $client: Pool;
    };
    inject: string[];
})[];
export type Database = NodePgDatabase<typeof schemas>;
