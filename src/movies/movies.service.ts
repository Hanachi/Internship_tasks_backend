import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesDataSource } from "./movies.provider";
import { Movie, MovieDocument } from "./schemas/movies.schema";
@Injectable()
export class MoviesService {
	constructor(
		private readonly moviesProvider: MoviesDataSource,
		@InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
		@InjectConnection() private connection: Connection
	) {
		
	}
	getAllMovies() {
		return this.moviesProvider.get();
	}

	getById(id: string) {
		return this.moviesProvider.getMovie(id);
	}

	create(movieDto: CreateMovieDto) {
		this.moviesProvider.add(movieDto);
	}

	update(updateMovieDto: UpdateMovieDto, id: string) {
		return this.moviesProvider.updateMovie(updateMovieDto, id);
	}

	remove(id: string) {
		return this.moviesProvider.delete(id);
	}
}