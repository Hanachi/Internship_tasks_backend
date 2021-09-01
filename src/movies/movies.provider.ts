import { Injectable } from "@nestjs/common";

import * as DATA_FROM_JSON from "../../movies.json";

@Injectable()
export class MoviesDataSource {
	public movies: any = DATA_FROM_JSON;
	
	getMovies() {
		return this.movies;
	}

}