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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const sections_service_1 = require("./sections.service");
let SectionsController = class SectionsController {
    sectionsService;
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    async create(idea) {
        if (!idea) {
            throw new common_1.HttpException('Idea is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const section = await this.sectionsService.create(idea);
            return { sections: section.sections };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create section', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findLatest() {
        const section = await this.sectionsService.findLatest();
        return { sections: section ? section.sections : [] };
    }
    async findById(id) {
        try {
            const section = await this.sectionsService.findById(id);
            if (!section) {
                throw new common_1.HttpException('Section not found', common_1.HttpStatus.NOT_FOUND);
            }
            return section;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch section', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SectionsController = SectionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('idea')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findLatest", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findById", null);
exports.SectionsController = SectionsController = __decorate([
    (0, common_1.Controller)('sections'),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
//# sourceMappingURL=sections.controller.js.map