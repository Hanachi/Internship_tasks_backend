import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';

import { UserEntity } from 'src/user/models/user.entity';
import { UserI } from 'src/user/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly authService: AuthService
	) {}
	
	/**
	 * Create new User
	 * @param newUser user data to create
	 * @returns Observable<UserI>
	 */
	create(newUser: UserI): Observable<UserI> {
		return this.mailExists(newUser.email).pipe(
			switchMap((exists: boolean) => {
				if(!exists) {
					return this.authService.hashPassword(newUser.password).pipe(
						switchMap((passwordHash: string) => {
							 
							newUser.password = passwordHash;
							return from(this.userRepository.save(newUser)).pipe(
								map((user: UserI) => {
									const { password, ...result } = user;
									return result;
								}),
								catchError(err => throwError(err))
							);
						})
					)
				} else {
					throw new HttpException('Email is already in use', HttpStatus.CONFLICT)
				}
			})
		)
	}

	login(user: UserI): Observable<string> {
		return this.validateUser(user).pipe(
			switchMap((foundUser: UserI) => {
				if(foundUser) {
					return this.authService.generateJWT(foundUser).pipe(map((jwt: string) => jwt))
				} else {
					throw new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
				}
			})
		)
	}

	validateUser(user: UserI): Observable<UserI> {
		return this.findByEmail(user.email).pipe(
			switchMap((foundUser: UserI) => {
				if (foundUser) {
					return this.authService.validatePassword(user.password, foundUser.password).pipe(
						map((matches: boolean) => {
							if (matches) {
								const { password, ...result } = user;
								return result;
							} else {
								throw new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
							}
						})
					)
				} else {
					throw new HttpException('User not found', HttpStatus.NOT_FOUND);
				}
			})
		)
	}

	findAll(): Observable<UserI[]> {
		return from(this.userRepository.find()).pipe(
			map((users: UserI[]) => {
				users.forEach(function (user) { delete user.password })
				return users;
			})
		);
	}

	private findByEmail(email: string): Observable<UserI> {
		return from(this.userRepository.findOne({email}, { select: ['id', 'email', 'username', 'password']}))
	}




	private findOne(id: number): Observable<UserI> {
		return from(this.userRepository.findOne({id}));
	}

	private mailExists(email: string): Observable<boolean> {
		return from(this.userRepository.findOne({email})).pipe(
			map((user: UserI) => {
				if(user) {
					return true;
				} else {
					return false;
				}
			})
		)
	}

}
