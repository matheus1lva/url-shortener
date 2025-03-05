import { IsString, IsNotEmpty } from 'class-validator';

export class GetShortenDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
