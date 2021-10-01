import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import * as fs from 'fs';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';
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

/**
 * Return all movies with relationships which satisfy query
 * @param query includes searchValue, page, rowsPerPage, orderBy, orderDirection
 * @returns Promise<Object>
 */
	
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
			.leftJoinAndSelect('movie.usersRating', 'usersRating')
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
		for (let i = 0; i < movies.length; i++) {

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
		
/**
 * Get movie by id
 * @param id movie id
 * @returns Promive<Movie>
 */

	async getMovie(id: string): Promise<Movie> {
		return this.moviesRepository.findOne(id, { relations: ['genres', 'actors', 'imdbRating', 'contentRating', 'usersRating']});
	}

/**
 * Return statistic: all genres, average users rating by title, year
 * @returns Promise<Object>
 */

	async getMoviesStatistics(): Promise<Object> {
		const allGenres = await getRepository(Genres)
		.createQueryBuilder('genres')
		.select('genres.name')
		.distinct(true)
		.getRawMany();

		const subQueryYear = await getRepository(Movie)
			.createQueryBuilder('movie')
			.leftJoinAndSelect('movie.usersRating', 'usersRating')
			.select('movie.year')
			.addSelect('unnest(users_rating)', 'users_rating')
			.addGroupBy('movie.year')
			.addGroupBy('usersRating.id')

		const avgByYear = await getRepository(Movie)
			.createQueryBuilder()
			.select('movie_year')
			.addSelect('AVG(users_rating)', 'rating')
			.from("(" + subQueryYear.getQuery() + ")", "movie")
			.distinct(true)
			.addGroupBy('movie_year')
			.getRawMany()
		
		const subQueryTitle = await getRepository(Movie)
			.createQueryBuilder('movie')
			.leftJoinAndSelect('movie.usersRating', 'usersRating')
			.select('movie.title')
			.addSelect('unnest(users_rating)', 'users_rating')
			.addGroupBy('movie.title')
			.addGroupBy('usersRating.id')

		const avgByTitle = await getRepository(Movie)
			.createQueryBuilder()
			.select('movie_title')
			.addSelect('AVG(users_rating)', 'rating')
			.from("(" + subQueryTitle.getQuery() + ")", "movie")
			.distinct(true)
			.addGroupBy('movie_title')
			.getRawMany()

		const statistic = {
			avgByYear: avgByYear,
			avgByTitle: avgByTitle,
			genres: allGenres
		}
		
		return statistic;
	}

/**
 * Create movie
 * @param movieDto data
 * @returns Promise<Movie>
 */
	async add(movieDto: CreateMovieDto): Promise<Movie> {
		
		const createGenres = movieDto.genres.map((genre) => {
			let genres = new Genres();
			genres.name = genre;
			return genres;
		});
		
		const createActors = movieDto.actors.map((actor) => {
			let actors = new Actors();
			actors.fullname = actor;
			return actors;
		});

		let imdbRating = new ImdbRatings();
		let contentRating = new ContentRatings();
		let usersRating = new UsersRatings();

		imdbRating.imdb_rating = movieDto.imdbRating;
		contentRating.content_rating = movieDto.contentRating;
		usersRating.users_rating = movieDto.usersRating;

		
		let movie = new Movie();
		movie.title = movieDto.title;
		movie.year = movieDto.year;
		movie.genres = createGenres;
		movie.actors = createActors;
		movie.imdbRating = imdbRating;
		movie.contentRating = contentRating;
		movie.usersRating = usersRating;

		return await this.moviesRepository.save(movie);
	}

	async updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<Movie> {
		const postToUpdate = await this.moviesRepository.findOne(id, { relations: ['genres', 'actors', 'imdbRating', 'contentRating', 'usersRating'] });

		const updateGenres = updateMovieDto.genres.map((genre) => {
			let genres = new Genres();
			genres.name = genre;
			return genres;
		});

		const updateActors = updateMovieDto.actors.map((actor) => {
			let actors = new Actors();
			actors.fullname = actor;
			return actors;
		});


		postToUpdate.title = updateMovieDto.title;
		postToUpdate.year = updateMovieDto.year;
		postToUpdate.genres = updateGenres;
		postToUpdate.actors = updateActors;
		postToUpdate.imdbRating.imdb_rating = updateMovieDto.imdbRating;
		postToUpdate.contentRating.content_rating = updateMovieDto.contentRating;
		postToUpdate.usersRating.users_rating = updateMovieDto.usersRating;

		return this.moviesRepository.save(postToUpdate);
	}

	async delete(id: string) {
		const movieToRemove = await this.moviesRepository.findOne(id, { relations: ['genres', 'actors', 'imdbRating', 'contentRating', 'usersRating'] });
		return await this.moviesRepository.softRemove(movieToRemove)
	}
}