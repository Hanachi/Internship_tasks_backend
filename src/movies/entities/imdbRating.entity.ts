import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class ImdbRatings {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	imdb_rating: string;

	@OneToOne(
		() => Movie,
		(movie: Movie) => movie.imdbRating,
		{ onDelete: 'CASCADE' }
	)
	movie: Movie;
}
