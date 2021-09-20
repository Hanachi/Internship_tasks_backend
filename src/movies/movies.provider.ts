import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, getRepository } from 'typeorm';
import * as fs from 'fs';

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movies.entity";
import { Genres } from './entities/genres.entity';
import { Actors } from './entities/actors.entity';
import { ImdbRatings } from './entities/imdbRating.entity';
import { UsersRatings } from './entities/usersRating.entity';
import { ContentRatings } from './entities/contentRating.entity';

@Injectable()
export class MoviesDataSource {
	constructor(
		@InjectRepository(Movie)
		private moviesRepository: Repository<Movie>,
		@InjectRepository(Genres)
		private genresRepository: Repository<Genres>,
		@InjectRepository(Actors)
		private actorsRepository: Repository<Actors>,
		@InjectRepository(ImdbRatings)
		private imdbRatingRepository: Repository<ImdbRatings>,
		@InjectRepository(ContentRatings)
		private contentRatingRepository: Repository<ContentRatings>,
		@InjectRepository(UsersRatings)
		private usersRatingRepository: Repository<UsersRatings>,
	) {}

	async get(query): Promise <Object> {
		const LIMIT = Number(query.rowsPerPage);
		const searchValue = query.search;
		let orderBy = query.orderBy;
		const orderDirection = query.direction.toUpperCase();
		const skip = (query.page == 0) ? 0 : (Number(query.page)) * LIMIT;

		const [data, total] = await getRepository(Movie)
			.createQueryBuilder('movie')
			.leftJoinAndSelect('movie.genres', 'genres')
			.leftJoinAndSelect('movie.actors', 'actors')
			.leftJoinAndSelect('movie.imdbRating', 'imdbRating')
			.leftJoinAndSelect('movie.contentRating', 'contentRating')
			.where("movie.title like :title", { title: `%${searchValue}%` })
			.orWhere("movie.year like :year", { year: `%${searchValue}%` })
			.orWhere("imdbRating.imdb_rating like :imdbR", { imdbR: `%${searchValue}%` })
			.orWhere("contentRating.content_rating like :contentR", { contentR: `%${searchValue}%` })
			.orWhere("genres.name like :genreName", { genreName: `%${searchValue}%` })
			.orWhere("actors.fullname like :actorName", { actorName: `%${searchValue}%` })
			.orderBy(`movie.${orderBy}`, orderDirection)
			.take(LIMIT)
			.skip(skip)
			.getManyAndCount()
		return { data, total, page: Number(query.page), rowsPerPage: LIMIT, }
	}

	async migrateData() {
		const data = fs.readFileSync('./movies.json', 'utf8');
		const movies = await JSON.parse(data);
		for(let i = 0; i < movies.length; i++) {

			const addGenres = await movies[i].genres.map((genre) => {
				let genres = new Genres();
				genres.name = genre;
				this.genresRepository.save(genres);
				return genres;
			});

			const addActors = await movies[i].actors.map((actor) => {
				let actors = new Actors();
				actors.fullname = actor;
				this.actorsRepository.save(actors);
				return actors;
			});
			
			let imdbRating = new ImdbRatings();
			let contentRating = new ContentRatings();
			let usersRating = new UsersRatings();

			imdbRating.imdb_rating = movies[i].imdbRating;
			contentRating.content_rating = movies[i].contentRating;
			usersRating.users_rating = movies[i].ratings;

			const imdbR = await this.imdbRatingRepository.save(imdbRating);
			const contentR = await this.contentRatingRepository.save(contentRating);
			const usersR = await this.usersRatingRepository.save(usersRating);

			let movie = new Movie();

			movie.title = movies[i].title;
			movie.year = movies[i].year;
			movie.genres = await addGenres;
			movie.actors = await addActors;
			movie.imdbRating = imdbR;
			movie.contentRating = contentR;
			movie.usersRating = usersR;

			await this.moviesRepository.save(movie);
		}
	}

	async getMovie(id: string): Promise<Movie> {
		return this.moviesRepository.findOne(id, { relations: ['genres', 'actors', 'imdbRating', 'contentRating', 'usersRating']});
	}

	// async getMoviesStatistics() {
	// 	const allGenres = await this.movieModel.distinct('genres');

	// 	const avgByYear = await this.movieModel.aggregate([
	// 		{ $unwind: "$ratings" },
	// 		{ 
	// 			$group: {
	// 			 _id: '$year',
	// 			 avgRatingYear: {$avg: '$ratings'},
	// 			}
	// 		},
	// 	]);
	// 	const avgByTitle = await this.movieModel.aggregate([
	// 		{ $unwind: "$ratings" },
	// 		{
	// 			$group: {
	// 				_id: '$title',
	// 				avgRatingTitle: { $avg: '$ratings' },
	// 			}
	// 		},
	// 	]);

	// 	const statistic = {
	// 		avgByYear: avgByYear,
	// 		avgByTitle: avgByTitle,
	// 		genres: allGenres
	// 	}
		
	// 	return statistic;
	// }

	async add(movieDto: CreateMovieDto): Promise<Movie> {
		const createGenres = await movieDto.genres.map((genre) => {
			let genres = new Genres();
			genres.name = genre;
			this.genresRepository.save(genres);
			return genres;
		});
		
		const createActors = movieDto.actors.map((actor) => {
			let actors = new Actors();
			actors.fullname = actor;
			this.actorsRepository.save(actors);
			return actors;
		});

		let imdbRating = new ImdbRatings();
		let contentRating = new ContentRatings();
		let usersRating = new UsersRatings();

		imdbRating.imdb_rating = movieDto.imdbRating;
		contentRating.content_rating = movieDto.contentRating;
		usersRating.users_rating = movieDto.usersRating;

		const imdbR = await this.imdbRatingRepository.save(imdbRating);
		const contentR = await this.contentRatingRepository.save(contentRating);
		const usersR = await this.usersRatingRepository.save(usersRating);

		
		let movie = new Movie();
		movie.title = movieDto.title;
		movie.year = movieDto.year;
		movie.genres = createGenres;
		movie.actors = createActors;
		movie.imdbRating = imdbR;
		movie.contentRating = contentR;
		movie.usersRating = usersR;
		return await this.moviesRepository.save(movie);
	}

	async updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<Movie> {
		// await this.moviesRepository.update(id, updateMovieDto);
		const updatedPost = await this.moviesRepository.findOne(id);
		if (updatedPost) {
			return updatedPost
		}
	}

	async delete(id: string) {
		const movieToDelete = await this.getMovie(id);
		// const acc = await this.actorsRepository.findOne({ where: { id: movieToDelete.actors.id } });
		// await this.actorsRepository.remove(acc)
		return await this.moviesRepository.delete(id)
	}
}