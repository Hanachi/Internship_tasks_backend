import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesController } from "./movies.controller";
import { MoviesDataSource } from "./movies.provider";
import { MoviesService } from "./movies.service";
import { Movie, MovieSchema } from './schemas/movies.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
	controllers: [MoviesController],
	providers: [MoviesService, MoviesDataSource],
})

export class MoviesModule {}