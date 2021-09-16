import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movies.entity";

@Injectable()
export class MoviesDataSource {
	constructor(
		@InjectRepository(Movie)
		private moviesRepository: Repository<Movie>,
	) {}

	async get(query): Promise<Movie[]> {
		return this.moviesRepository.find()
	}

	// async getMovie(id: string): Promise<Movie> {
	// 	return this.moviesRepository.findById(id);
	// }

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

	// async add(movieDto: CreateMovieDto): Promise<Movie> {
	// 	const newMovie = new this.moviesRepository(movieDto);
	// 	return await newMovie.save();
	// }

	// async updateMovie(updateMovieDto: UpdateMovieDto, id: string): Promise<Movie> {
	// 	return this.moviesRepository.findByIdAndUpdate(id, updateMovieDto, {new: true});
	// }

	// async delete(id: string): Promise<Movie> {
	// 	return this.moviesRepository.findByIdAndRemove(id);
	// }
}