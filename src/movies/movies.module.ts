import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MoviesController } from "./movies.controller";
import { MoviesDataSource } from "./movies.provider";

import { Movie } from "./entities/movies.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Movie])],
	exports: [TypeOrmModule],
	controllers: [MoviesController],
	providers: [MoviesService, MoviesDataSource],
})

export class MoviesModule {}