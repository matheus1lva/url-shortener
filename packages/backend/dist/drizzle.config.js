"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    schema: './schema/*',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL ||
            'postgres://postgres:postgres@localhost:5432/url_shortener',
    },
};
//# sourceMappingURL=drizzle.config.js.map