import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinTable, DeleteDateColumn } from 'typeorm';
import { Actors } from './actors.entity';
import { ContentRatings } from './contentRating.entity';
import { Genres } from './genres.entity';
import { ImdbRatings } from './imdbRating.entity';
import { UsersRatings } from './usersRating.entity';

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	title: string;

	@Column()
	year: string;
	
	@OneToOne(
		() => ImdbRatings,
		(imdbRating: ImdbRatings) => imdbRating.movie,
		{ cascade: true }
	)
	imdbRating: ImdbRatings;
	
	@OneToOne(
		() => ContentRatings,
		(contentRating: ContentRatings) => contentRating.movie,
		{ cascade: true }
	)
	contentRating: ContentRatings;

	@OneToOne(
		() => UsersRatings,
		(usersRating: UsersRatings) => usersRating.movie,
		{ cascade: true }
	)
	usersRating: UsersRatings;


	@ManyToMany(
		() => Actors,
		(actors: Actors) => actors.movie,
		{ cascade: true }
	)
	@JoinTable()
	actors: Actors[];

	@ManyToMany(
		() => Genres,
		(genres: Genres) => genres.movie,
		{ cascade: true }
	)
	@JoinTable()
	genres: Genres[];

	@DeleteDateColumn()
	deletedAt?: Date;
}
