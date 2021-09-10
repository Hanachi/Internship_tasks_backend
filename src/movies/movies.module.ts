import { Module } from "@nestjs/common";

import { MoviesController } from "./movies.controller";
import { MoviesDataSource } from "./movies.provider";
import { MoviesService } from "./movies.service";

@Module({
	providers: [MoviesService, MoviesDataSource],
	controllers: [MoviesController]
})

export class MoviesModule {}