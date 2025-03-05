import { ApiProperty } from '@nestjs/swagger';

export class UrlShortenDetailsDto {
  @ApiProperty({
    description: 'The URL to shorten',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'The short URL',
    example: 'https://localhost:3000/shorten/my-custom-slug',
  })
  shortUrl: string;

  @ApiProperty({
    description: 'The slug',
    example: 'my-custom-slug',
  })
  slug: string;

  @ApiProperty({
    description: 'The number of visits',
    example: 10,
  })
  visits: number;

  @ApiProperty({
    description: 'The date and time the URL was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
