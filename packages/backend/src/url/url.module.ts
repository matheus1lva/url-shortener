import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { DatabaseModule } from '../database/database.module';
import { UrlRepository } from 'src/url/url.repository';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UrlService],
})
export class UrlModule {}
