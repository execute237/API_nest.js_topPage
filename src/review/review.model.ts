import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { ProductModel } from '../product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop()
	createdAt: Date;

	@Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name })
	productId: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
