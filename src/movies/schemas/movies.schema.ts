import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
	@Prop()
	id?: string;

	@Prop()
	title: string;

	@Prop(Number)
	year: number;

	@Prop([String])
	genres: string[];

	@Prop([Number])
	ratings: number[];

	@Prop()
	poster: string;

	@Prop()
	contentRating: string;

	@Prop()
	duration: string;

	@Prop()
	releaseDate: string;

	@Prop()
	averageRating: number;

	@Prop()
	originalTitle: string;

	@Prop()
	storyline: string;

	@Prop([String])
	actors: string[];

	@Prop()
	imdbRating: string;

	@Prop()
	posterurl: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);