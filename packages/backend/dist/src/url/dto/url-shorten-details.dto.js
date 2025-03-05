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
exports.UrlShortenDetailsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UrlShortenDetailsDto {
    originalUrl;
    shortUrl;
    slug;
    visits;
    createdAt;
}
exports.UrlShortenDetailsDto = UrlShortenDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The URL to shorten',
        example: 'https://www.google.com',
    }),
    __metadata("design:type", String)
], UrlShortenDetailsDto.prototype, "originalUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The short URL',
        example: 'https://localhost:3000/shorten/my-custom-slug',
    }),
    __metadata("design:type", String)
], UrlShortenDetailsDto.prototype, "shortUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The slug',
        example: 'my-custom-slug',
    }),
    __metadata("design:type", String)
], UrlShortenDetailsDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The number of visits',
        example: 10,
    }),
    __metadata("design:type", Number)
], UrlShortenDetailsDto.prototype, "visits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time the URL was created',
        example: '2021-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], UrlShortenDetailsDto.prototype, "createdAt", void 0);
//# sourceMappingURL=url-shorten-details.dto.js.map