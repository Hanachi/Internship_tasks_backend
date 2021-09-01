import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {

	}

	@Get()
	getAllMovies(): any {
		return this.moviesService.getAllMovies();
	}

	@Get(':id')
	getOneMovie(@Param('id') id: string) {
		return this.moviesService.getById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createMovie: CreateMovieDto) {
		return this.moviesService.create(createMovie);
	}
	
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.moviesService.remove(id);
	}
	
	@Patch(':id')
	update(@Body() updateMovie: UpdateMovieDto, @Param('id') id: string) {
		return this.moviesService.update(updateMovie, id);
	}
}
