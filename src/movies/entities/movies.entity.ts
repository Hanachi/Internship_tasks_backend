import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany, OneToOne, JoinTable } from 'typeorm';
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
	@JoinTable()
	imdbRating: ImdbRatings;
	
	@OneToOne(
		() => ContentRatings,
		(contentRating: ContentRatings) => contentRating.movie,
		{ cascade: true }
	)
	@JoinTable()
	contentRating: ContentRatings;

	@OneToOne(
		() => UsersRatings,
		(usersRating: UsersRatings) => usersRating.movie,
		{ cascade: true }
	)
	@JoinTable()
	usersRating: UsersRatings;


	@ManyToMany(
		() => Actors,
		(actors: Actors) => actors.movie,
		{ cascade: true }
	)
	@JoinTable()
	@JoinColumn()
	actors: Actors[];

	@ManyToMany(
		() => Genres,
		(genres: Genres) => genres.movie,
		{ cascade: true }
	)
	@JoinTable()
	@JoinColumn()
	genres: Genres[];
}
