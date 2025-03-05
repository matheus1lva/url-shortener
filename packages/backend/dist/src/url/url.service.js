"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const url_repository_1 = require("./url.repository");
let UrlService = class UrlService {
    urlRepository;
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    async createShortUrl(createUrlDto) {
        const { originalUrl, customSlug } = createUrlDto;
        let formattedUrl = originalUrl;
        if (!formattedUrl.startsWith('http://') &&
            !formattedUrl.startsWith('https://')) {
            formattedUrl = 'https://' + formattedUrl;
        }
        const slug = customSlug || (0, nanoid_1.nanoid)(6);
        const [existingShortned] = await this.urlRepository.findBySlug(slug);
        if (existingShortned && customSlug) {
            throw new common_1.ConflictException('Custom slug already in use');
        }
        const result = await this.urlRepository.create({
            originalUrl: formattedUrl,
            slug,
        });
        return result[0];
    }
    async getOriginalUrl(slug) {
        const [url] = await this.urlRepository.findBySlug(slug);
        if (!url) {
            throw new common_1.NotFoundException('URL not found');
        }
        await this.urlRepository.update(url.id, {
            visits: (url.visits ?? 0) + 1,
        });
        return url.originalUrl;
    }
    async getUrlDetails(slug) {
        const [url] = await this.urlRepository.findBySlug(slug);
        if (!url) {
            throw new common_1.NotFoundException('URL not found');
        }
        return {
            originalUrl: url.originalUrl,
            shortUrl: `/shorten/${url.slug}`,
            slug: url.slug,
            visits: url.visits,
            createdAt: url.createdAt,
        };
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [url_repository_1.UrlRepository])
], UrlService);
//# sourceMappingURL=url.service.js.map