import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class ContentRatings {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	content_rating: string;

	@OneToOne(() => Movie, (movie: Movie) => movie.contentRating, { onDelete: 'CASCADE' })
	movie: Movie;
}