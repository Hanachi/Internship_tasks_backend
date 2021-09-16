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
		{
			eager: true,
			cascade: true
		}
	)
	@JoinColumn()
	imdbRating: ImdbRatings;
	
	@OneToOne(
		() => ContentRatings,
		(contentRating: ContentRatings) => contentRating.movie,
		{
			eager: true,
			cascade: true
		}
	)
	@JoinColumn()
	contentRating: ContentRatings;

	@OneToOne(
		() => UsersRatings,
		(usersRating: UsersRatings) => usersRating.movie,
		{
			eager: true,
			cascade: true
		}
	)
	@JoinColumn()
	usersRating: UsersRatings;


	@ManyToMany(
		() => Actors,
		(actors: Actors) => actors.movie,
		{
			eager: true,
			cascade: true
		}
	)
	@JoinTable()
	@JoinColumn()
	actors: Actors[];

	@ManyToMany(
		() => Genres,
		(genres: Genres) => genres.movie,
		{
			eager: true,
			cascade: true
		}
	)
	@JoinTable()
	@JoinColumn()
	genres: Genres[];
}
