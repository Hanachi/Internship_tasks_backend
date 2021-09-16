import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Genres {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@ManyToMany(
		() => Movie,
		(movie: Movie) => movie.genres
	)
	movie: Movie;
}
