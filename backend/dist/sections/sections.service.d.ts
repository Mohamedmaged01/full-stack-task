import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';
export declare class SectionsService {
    private sectionModel;
    constructor(sectionModel: Model<SectionDocument>);
    create(idea: string): Promise<Section>;
    findById(id: string): Promise<Section | null>;
    findLatest(): Promise<Section | null>;
}
