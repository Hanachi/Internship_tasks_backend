import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from "./schemas/movies.schema";

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {

	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ 
		status: 200,
		description: 'Movie data successfully received',
		isArray: true
	})
	getAllMovies(): Promise<Movie[]> {
		return this.moviesService.getAllMovies();
	}

	@Get(':id')
	@ApiResponse({ status: 200, description: 'The movie has been found by id.' })
	@HttpCode(HttpStatus.OK)
	getOneMovie(@Param('id') id: string): Promise<Movie> {
		return this.moviesService.getById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({ description: 'The movie has been successfully created.' })
	@ApiBody({type: CreateMovieDto})
	create(@Body() createMovie: CreateMovieDto): Promise<Movie> {
		return this.moviesService.create(createMovie);
	}
	
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'The movie has been successfully deleted.' })
	remove(@Param('id') id: string): Promise<Movie>  {
		return this.moviesService.remove(id);
	}
	
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'The movie has been successfully updated.' })
	@ApiBody({ type: UpdateMovieDto })
	update(@Body() updateMovie: UpdateMovieDto, @Param('id') id: string): Promise<Movie>  {
		return this.moviesService.update(updateMovie, id);
	}
}
