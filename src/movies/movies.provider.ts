import { Injectable } from "@nestjs/common";

import * as DATA_FROM_JSON from "../../movies.json";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesDataSource {
	public movies: any = DATA_FROM_JSON;
	constructor() {
		this.movies.map((movie, i) => {
			movie.id = (new Date()).getTime() + i;
		})
	}
	
	
	get() {
		return this.movies;
	}

	getMovie(id: string) {
		return this.movies.find(movie => movie.id == id);
	}

	add(movieDto: CreateMovieDto) {
		return this.movies.push({
			...movieDto,
			id: Date.now().toString()
		});
	}

	updateMovie(updateMovieDto: UpdateMovieDto, id: string) {
		this.movies = this.movies.map((el) => {
			if (el.id == id) {
				return { ...el, ...updateMovieDto }
			}
			return el;
		})
		return this.movies;
	}

	delete(id: string) {
		const movie = this.getMovie(id)
		const index = this.movies.indexOf(movie);
		return this.movies.splice(index, 1);
	}
}