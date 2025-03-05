import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { DatabaseModule } from '../database/database.module';
import { UrlRepository } from 'src/url/url.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
  exports: [UrlService],
})
export class UrlModule {}
