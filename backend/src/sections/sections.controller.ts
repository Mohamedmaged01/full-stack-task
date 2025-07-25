import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async create(@Body('idea') idea: string) {
    if (!idea) {
      throw new HttpException('Idea is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const section = await this.sectionsService.create(idea);
      return { sections: section.sections };
    } catch (error) {
      throw new HttpException(
        'Failed to create section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findLatest() {
    const section = await this.sectionsService.findLatest();
    return { sections: section ? section.sections : [] };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const section = await this.sectionsService.findById(id);
      if (!section) {
        throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
      }
      return section;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
