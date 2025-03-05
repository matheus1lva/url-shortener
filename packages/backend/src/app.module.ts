import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';
import { UrlController } from 'src/url/url.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UrlModule,
  ],
  controllers: [UrlController],
  providers: [],
})
export class AppModule {}
