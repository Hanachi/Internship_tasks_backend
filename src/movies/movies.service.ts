import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";

import { Response } from 'express';

import * as DATA_FROM_JSON from "../../movies.json";

@Injectable()
export class MoviesService {
	private movies = [];

	getAllMovies(res: Response) {
		return res.json(DATA_FROM_JSON);
	}

	getById(id: string) {
		return this.movies.find(m => m.id === id);
	}

	create(movieDto: CreateMovieDto) {
		this.movies.push({
			...movieDto,
			id: Date.now().toString()
		})
	}
}