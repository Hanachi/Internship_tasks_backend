import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class UsersRatings {
	@PrimaryGeneratedColumn()
	id: string;

	@Column('int', { array: true }, )
	users_rating: number[];

	@OneToOne(
		() => Movie,
		(movie: Movie) => movie.usersRating,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn()
	movie: Movie;

	@DeleteDateColumn()
	deletedAt?: Date;
}
