import { CreateUrlDto } from './dto/create-url.dto';
import { UrlRepository } from 'src/url/url.repository';
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: UrlRepository);
    createShortUrl(createUrlDto: CreateUrlDto): Promise<{
        id: string;
        originalUrl: string;
        slug: string;
        userId: string | null;
        visits: number;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    getOriginalUrl(slug: string): Promise<string>;
    getUrlDetails(slug: string): Promise<{
        originalUrl: string;
        shortUrl: string;
        slug: string;
        visits: number;
        createdAt: Date;
    }>;
}
