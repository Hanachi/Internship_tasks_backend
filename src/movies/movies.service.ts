import { Injectable } from "@nestjs/common";

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesDataSource } from "./movies.provider";
@Injectable()
export class MoviesService {
	constructor(private readonly moviesProvider: MoviesDataSource) {
		
	}
	getAllMovies() {
		return this.moviesProvider.getMovies();
	}

	getById(id: string) {
		return this.moviesProvider.movies.find(movie => movie.title == id);
	}

	create(movieDto: CreateMovieDto) {
		this.moviesProvider.movies.push(movieDto);
	}

	update(updateMovieDto: UpdateMovieDto, id: string) {
		this.moviesProvider.movies = this.moviesProvider.movies.map((el) => {
			if(el.title == id) {
				return { ...el, ...updateMovieDto }
			}
			return el;
		})
		return this.moviesProvider.movies;
	}

	remove(id: string) {
		const index = this.moviesProvider.movies.indexOf(id);
		return this.moviesProvider.movies.splice(index);
	}
}