import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @ApiProperty({
    description: 'The URL to shorten',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message:
      'Custom slug can only contain letters, numbers, underscores, and hyphens',
  })
  @ApiProperty({
    description: 'The custom slug to use for the URL',
    example: 'my-custom-slug',
  })
  customSlug?: string;
}
