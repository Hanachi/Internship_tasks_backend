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

	async get(query: string): Promise<Movie[]> {
		const movies = await this.movieModel.find({ $or:
		[
			{ '_id': { '$regex': query || '', '$options': 'i' } },
			{ 'title': { '$regex': query || '', '$options': 'i' } },
			{ 'year': { '$regex': query || '', '$options': 'i' } },
			{ 'genres': { '$regex': query || '', '$options': 'i' } },
			{ 'actors': { '$regex': query || '', '$options': 'i' } },
			{ 'storyline': { '$regex': query || '', '$options': 'i' } },

		] });

		return movies;
	}

	async getMovie(id: string): Promise<Movie> {
		return this.movieModel.findById(id);
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