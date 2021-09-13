import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie, MovieDocument } from "./schemas/movies.schema";

@Injectable()
export class MoviesDataSource {
	constructor(
		@InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
	) {}

	async get(query): Promise<Object> {
		const LIMIT = Number(query.rowsPerPage);
		const orderBy = query.orderBy;
		const orderDirection = query.direction;
		const startIndex = (query.page == 0) ? 0 : (Number(query.page)) * LIMIT;
		const total = await this.movieModel.countDocuments({
			$or:
				[
					{ 'title': { '$regex': query.search || '', '$options': 'i' } },
					{ 'year': { '$regex': query.search || '', '$options': 'i' } },
					{ 'year': Number(query.search) },
					{ 'genres': { '$regex': query.search || '', '$options': 'i' } },
					{ 'actors': { '$regex': query.search || '', '$options': 'i' } },
				]
		});
		const movies = await this.movieModel.find({ $or:
		[
			{ 'title': { '$regex': query.search || '', '$options': 'i' } },
			{ 'year':  { '$regex': query.search || '', '$options': 'i' } },
			{ 'year':  Number(query.search ) },
			{ 'genres': { '$regex': query.search  || '', '$options': 'i' } },
			{ 'actors': { '$regex': query.search  || '', '$options': 'i' } },
		] }).limit(LIMIT).skip(startIndex).sort([[orderBy, orderDirection]]);
		const result = { data: movies, page: Number(query.page), rowsPerPage: query.rowsPerPage, count: total}

		return result;
	}

	async getMovie(id: string): Promise<Movie> {
		return this.movieModel.findById(id);
	}

	async getMoviesStatistics() {
		const allGenres = this.movieModel.distinct('genres');

		const avgByTitle = this.movieModel.aggregate([
			{ $unwind: "$ratings" },
			{ 
				$group: {
				 _id: '$year',
				 avgRating: {$avg: '$ratings'},
				}
			},
		]);

		return avgByTitle;
	}

	async add(movieDto: CreateMovieDto): Promise<Movie> {
		const newMovie = new this.movieModel(movieDto);
		return await newMovie.save();
	}

	async updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<Movie> {
		return this.movieModel.findByIdAndUpdate(id, updateMovieDto, {new: true});
	}

	async delete(id: string): Promise<Movie> {
		return this.movieModel.findByIdAndRemove(id);
	}
}