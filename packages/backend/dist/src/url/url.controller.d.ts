import { Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { GetShortenDto } from 'src/url/dto/get-shorten.dto';
import { UrlShortenDetailsDto } from 'src/url/dto/url-shorten-details.dto';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    createShortUrl(createUrlDto: CreateUrlDto): Promise<{
        originalUrl: string;
        shortUrl: string;
        slug: string;
    }>;
    redirect(params: GetShortenDto, res: Response): Promise<void>;
    getUrlDetails(params: GetShortenDto): Promise<UrlShortenDetailsDto>;
}
