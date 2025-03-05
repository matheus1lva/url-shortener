"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = exports.PG_POOL_PROVIDER = exports.DATABASE_PROVIDER = void 0;
const config_1 = require("@nestjs/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schemas = require("../../schema");
exports.DATABASE_PROVIDER = 'DATABASE_PROVIDER';
exports.PG_POOL_PROVIDER = 'PG_POOL_PROVIDER';
exports.databaseProvider = [
    {
        provide: exports.PG_POOL_PROVIDER,
        useFactory: (configService) => {
            return new pg_1.Pool({
                connectionString: configService.get('DATABASE_URL'),
            });
        },
        inject: [config_1.ConfigService],
    },
    {
        provide: exports.DATABASE_PROVIDER,
        useFactory: (pool) => {
            return (0, node_postgres_1.drizzle)({
                client: pool,
                schema: schemas,
            });
        },
        inject: [exports.PG_POOL_PROVIDER],
    },
];
//# sourceMappingURL=database.provider.js.map