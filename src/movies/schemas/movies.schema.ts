import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
	@Prop()
	title: string;

	@Prop()
	year: number;

	@Prop([String])
	cast: string[];

	@Prop([String])
	genres: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);