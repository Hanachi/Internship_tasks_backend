import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MoviesController } from "./movies.controller";
import { MoviesDataSource } from "./movies.provider";

import { Movie } from "./entities/movies.entity";
import { Genres } from "./entities/genres.entity";
import { Actors } from "./entities/actors.entity";
import { ImdbRatings } from "./entities/imdbRating.entity";
import { ContentRatings } from "./entities/contentRating.entity";
import { UsersRatings } from "./entities/usersRating.entity";

@Module({
	imports: [TypeOrmModule.forFeature([
		Movie,
		Genres,
		Actors,
		ImdbRatings,
		ContentRatings,
		UsersRatings
	])],
	exports: [TypeOrmModule],
	controllers: [MoviesController],
	providers: [MoviesService, MoviesDataSource],
})

export class MoviesModule {}