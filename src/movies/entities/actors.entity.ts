import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Actors {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	fullname: string;

	@ManyToOne(
		() => Movie,
		(movie: Movie) => movie.actors,
		{ onDelete: 'CASCADE' }
	)
	movie: Movie;
}
