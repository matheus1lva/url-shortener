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
exports.CreateUrlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUrlDto {
    originalUrl;
    customSlug;
}
exports.CreateUrlDto = CreateUrlDto;
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid URL' }),
    (0, swagger_1.ApiProperty)({
        description: 'The URL to shorten',
        example: 'https://www.google.com',
    }),
    __metadata("design:type", String)
], CreateUrlDto.prototype, "originalUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/, {
        message: 'Custom slug can only contain letters, numbers, underscores, and hyphens',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The custom slug to use for the URL',
        example: 'my-custom-slug',
    }),
    __metadata("design:type", String)
], CreateUrlDto.prototype, "customSlug", void 0);
//# sourceMappingURL=create-url.dto.js.map