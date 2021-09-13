import { Injectable } from "@nestjs/common";

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesDataSource } from "./movies.provider";
@Injectable()
export class MoviesService {
	constructor(
		private readonly moviesProvider: MoviesDataSource,
	) {
		
	}
	getAllMovies(query) {
		return this.moviesProvider.get(query);
	}

	getById(id: string) {
		return this.moviesProvider.getMovie(id);
	}

	getStatistics() {
		return this.moviesProvider.getMoviesStatistics();
	}

	create(movieDto: CreateMovieDto) {
		return this.moviesProvider.add(movieDto);
	}

	update(updateMovieDto: UpdateMovieDto, id: string) {
		return this.moviesProvider.updateMovie(updateMovieDto, id);
	}

	remove(id: string) {
		return this.moviesProvider.delete(id);
	}
}