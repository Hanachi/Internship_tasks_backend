import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

import { Movie } from './entities/movies.entity';

import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/models/user.interface';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	/**
	 * return all movies data from DB
	 * @returns Promise<Object> 
	 */
	@hasRoles(UserRole.USER, UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ 
		status: 200,
		description: 'Movie data successfully received',
		isArray: true
	})
	getAllMovies(@Query() query): Promise<Object> {
		return this.moviesService.getAllMovies(query);
	}
	
	@hasRoles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('/mig/migrate')
	mig() {
		return this.moviesService.migrate();
	}

	@hasRoles(UserRole.USER, UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('/statistic')
	getInfo() {
		return this.moviesService.getStatistics();
	}
	/**
	 * return movie by id
	 * @param id 
	 * @returns Promise<Movie>
	 */
	@hasRoles(UserRole.USER, UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	@ApiResponse({ status: 200, description: 'The movie has been found by id.' })
	@HttpCode(HttpStatus.OK)
	getOneMovie(@Param('id') id: string): Promise<Movie> {
		return this.moviesService.getById(id);
	}

	@hasRoles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({ description: 'The movie has been successfully created.' })
	@ApiBody({type: CreateMovieDto})
	create(@Body() createMovie: CreateMovieDto): Promise<Movie> {
		return this.moviesService.create(createMovie);
	}
	
	@hasRoles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'The movie has been successfully deleted.' })
	remove(@Param('id') id: string)  {
		return this.moviesService.remove(id);
	}
	
	@hasRoles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'The movie has been successfully updated.' })
	@ApiBody({ type: UpdateMovieDto })
	update(@Body() updateMovie: UpdateMovieDto, @Param('id') id: string): Promise<Movie>  {
		return this.moviesService.update(updateMovie, id);
	}
}
