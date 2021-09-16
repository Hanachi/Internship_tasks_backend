import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Actors {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	first_name: string;

	@Column()
	last_Name: string;

	@ManyToMany(
		() => Movie,
		(movie: Movie) => movie.actors
	)
	movie: Movie;
}
