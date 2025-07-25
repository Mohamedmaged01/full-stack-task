import { SectionsService } from './sections.service';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    create(idea: string): Promise<{
        sections: string[];
    }>;
    findLatest(): Promise<{
        sections: string[];
    }>;
    findById(id: string): Promise<import("./section.schema").Section>;
}
