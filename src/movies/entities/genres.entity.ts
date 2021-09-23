import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class Genres {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@ManyToMany(
		() => Movie,
		(movie: Movie) => movie.genres,
		{ onDelete: 'CASCADE', onUpdate: 'CASCADE' }
	)
	movie: Movie;

	@DeleteDateColumn()
	deletedAt?: Date;
}
