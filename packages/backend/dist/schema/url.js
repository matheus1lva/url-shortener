"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.urlTable = (0, pg_core_1.pgTable)('url', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    originalUrl: (0, pg_core_1.text)('original_url').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull(),
    userId: (0, pg_core_1.text)('user_id'),
    visits: (0, pg_core_1.integer)('visits').default(0).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => {
    return [(0, pg_core_1.uniqueIndex)('slug_idx').on(table.slug)];
});
//# sourceMappingURL=url.js.map