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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
const create_url_dto_1 = require("./dto/create-url.dto");
const get_shorten_dto_1 = require("./dto/get-shorten.dto");
const url_shorten_details_dto_1 = require("./dto/url-shorten-details.dto");
const swagger_1 = require("@nestjs/swagger");
let UrlController = class UrlController {
    urlService;
    constructor(urlService) {
        this.urlService = urlService;
    }
    async createShortUrl(createUrlDto) {
        const url = await this.urlService.createShortUrl(createUrlDto);
        return {
            originalUrl: url.originalUrl,
            shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/shorten/${url.slug}`,
            slug: url.slug,
        };
    }
    async redirect(params, res) {
        const originalUrl = await this.urlService.getOriginalUrl(params.slug);
        return res.redirect(originalUrl);
    }
    async getUrlDetails(params) {
        return this.urlService.getUrlDetails(params.slug);
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The URL was created successfully',
        type: url_shorten_details_dto_1.UrlShortenDetailsDto,
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_dto_1.CreateUrlDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createShortUrl", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: 'Redirect to the original URL',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The URL not found',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_shorten_dto_1.GetShortenDto, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "redirect", null);
__decorate([
    (0, common_1.Get)(':slug/details'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The details of the URL',
        type: url_shorten_details_dto_1.UrlShortenDetailsDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The URL not found',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_shorten_dto_1.GetShortenDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrlDetails", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('shorten'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map