import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
export declare class DatabaseModule implements OnModuleInit, OnModuleDestroy {
    private readonly client;
    constructor(client: Pool);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
