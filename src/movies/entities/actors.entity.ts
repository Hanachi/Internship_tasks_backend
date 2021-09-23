import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Actors {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	fullname: string;

	@ManyToMany(
		() => Movie,
		(movie: Movie) => movie.actors,
		{ onDelete: 'CASCADE', onUpdate: 'CASCADE' }
	)
	movie: Movie;
	@DeleteDateColumn()
	deletedAt?: Date;
}
