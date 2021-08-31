import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {

	}

	@Get()
	getAllMovies(@Res() res: Response): any {
		return this.moviesService.getAllMovies(res);
	}

	@Get(':id')
	getOneMovie(@Param('id') id: string) {
		return this.moviesService.getById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() createMovie: CreateMovieDto) {
		return this.moviesService.create(createMovie)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return 'Remove ' + id;
	}

	@Put(':id')
	update(@Body() updateMovie: UpdateMovieDto, @Param('id') id: string) {
		return 'Update ' + id;
	}
}
