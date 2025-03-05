import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { GetShortenDto } from 'src/url/dto/get-shorten.dto';
import { UrlShortenDetailsDto } from 'src/url/dto/url-shorten-details.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('shorten')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The URL was created successfully',
    type: UrlShortenDetailsDto,
  })
  async createShortUrl(@Body(ValidationPipe) createUrlDto: CreateUrlDto) {
    const url = await this.urlService.createShortUrl(createUrlDto);
    return {
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/shorten/${url.slug}`,
      slug: url.slug,
    };
  }

  @Get(':slug')
  @ApiResponse({
    status: 302,
    description: 'Redirect to the original URL',
  })
  @ApiResponse({
    status: 404,
    description: 'The URL not found',
  })
  async redirect(@Param() params: GetShortenDto, @Res() res: Response) {
    const originalUrl = await this.urlService.getOriginalUrl(params.slug);
    return res.redirect(originalUrl);
  }

  @Get(':slug/details')
  @ApiResponse({
    status: 200,
    description: 'The details of the URL',
    type: UrlShortenDetailsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The URL not found',
  })
  async getUrlDetails(
    @Param() params: GetShortenDto,
  ): Promise<UrlShortenDetailsDto> {
    return this.urlService.getUrlDetails(params.slug);
  }
}
