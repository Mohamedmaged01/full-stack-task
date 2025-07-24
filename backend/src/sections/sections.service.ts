import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  async create(idea: string): Promise<Section> {
    // Generate dummy sections
    const dummySections = ['Hero', 'About', 'Contact'];
    const created = new this.sectionModel({ idea, sections: dummySections });
    return created.save();
  }

  async findById(id: string): Promise<Section | null> {
    return this.sectionModel.findById(id).exec();
  }

  async findLatest(): Promise<Section | null> {
    return this.sectionModel.findOne().sort({ createdAt: -1 }).exec();
  }
}
