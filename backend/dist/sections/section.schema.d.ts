import { Document } from 'mongoose';
export type SectionDocument = Section & Document;
export declare class Section {
    idea: string;
    sections: string[];
}
export declare const SectionSchema: import("mongoose").Schema<Section, import("mongoose").Model<Section, any, any, any, Document<unknown, any, Section, any> & Section & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Section, Document<unknown, {}, import("mongoose").FlatRecord<Section>, {}> & import("mongoose").FlatRecord<Section> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
