import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Genres {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@ManyToOne(
		() => Movie,
		(movie: Movie) => movie.genres,
		{ onDelete: 'CASCADE' }
	)
	movie: Movie;
}
