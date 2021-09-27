import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserI } from '../models/user.interface';

import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user-service/user.service';

@Controller('users')
export class UserController {

	constructor(
		private userService: UserService,
		private userHelperService: UserHelperService
	){}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Observable<UserI | Object> {
		return this.userHelperService.createUserDtoToEntity(createUserDto).pipe(
			switchMap((user: UserI) => this.userService.create(user).pipe(
				map((user: UserI) => user),
				catchError(err => of({ error: err.message }))
			))
		)
	}

	@Get(':id')
	findOne(@Param('id') id: number): Observable<UserI> {
		return this.userService.findOne(id);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number): Observable<any> {
		return this.userService.deleteUser(id);
	}

	@Patch(':id')
	updateUser(@Param('id') id: number, @Body() user: UserI): Observable<any> {
		return this.userService.updateUser(id, user);
	}
	
	@Get()
	findAll(): Observable<UserI[]> {
		return this.userService.findAll()
	}

	@Post('login')
	login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
		return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe(
			switchMap((user: UserI) => this.userService.login(user).pipe(
				map((jwt: string) => {
					return { access_token: jwt }
				})
			))
		)
	}
}
