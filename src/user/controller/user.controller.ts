import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserI, UserRole } from '../models/user.interface';

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
	
	@hasRoles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	findAll(): Observable<UserI[]> {
		return this.userService.findAll()
	}

	@Post('login')
	login(@Body() user: UserI): Observable<Object> {
			return this.userService.login(user).pipe(
				map((jwt: string) => {
					return { access_token: jwt }
				})
			
		)
	}
}
