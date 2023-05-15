import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}
const HhDataSchema = SchemaFactory.createForClass(HhData);

@Schema({ timestamps: true })
class AdvantageData {
	@Prop()
	title: string;

	@Prop()
	description: string;
}
const AdvantageSchema = SchemaFactory.createForClass(AdvantageData);

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: HhDataSchema })
	hh?: HhData;

	@Prop({ type: [AdvantageSchema] })
	advantages: AdvantageData[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
