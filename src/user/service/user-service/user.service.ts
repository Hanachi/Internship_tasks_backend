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
	create(user: UserI): Observable<UserI> {
		return this.mailExists(user.email).pipe(
			switchMap((exists: boolean) => {
				if(!exists) {
					return this.authService.hashPassword(user.password).pipe(
						switchMap((passwordHash: string) => {
							let newUser = new UserEntity();
							newUser.username = user.username;
							newUser.email = user.email;
							newUser.role = user.role;
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

	/**
	 * Login user with JWT.
	 * @param user user email and password
	 * @returns Observable<string>
	 */
	login(user: UserI): Observable<string> {
		return this.validateUser(user.email, user.password).pipe(
			switchMap((foundUser: UserI) => {
				if(foundUser) {
					return this.authService.generateJWT(foundUser).pipe(map((jwt: string) => jwt))
				} else {
					throw new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
				}
			})
		)
	}

	googleLogin(req) {
		console.log(req)
		if(!req.user) {
			return 'No user from google'
		}
		return {
			message: 'User info from Google',
			user: req.user
		}
		// return this.mailExists(user.email).pipe(
		// 	switchMap((exists: boolean) => {
		// 		if (!exists) {
		// 			return this.authService.hashPassword(user.password).pipe(
		// 				switchMap((passwordHash: string) => {
		// 					let newUser = new UserEntity();
		// 					newUser.username = user.username;
		// 					newUser.email = user.email;
		// 					newUser.role = user.role;
		// 					newUser.password = passwordHash;

		// 					return from(this.userRepository.save(newUser)).pipe(
		// 						map((user: UserI) => {
		// 							const { password, ...result } = user;
		// 							return result;
		// 						}),
		// 						catchError(err => throwError(err))
		// 					);
		// 				})
		// 			)
		// 		} else {
		// 			throw new HttpException('Email is already in use', HttpStatus.CONFLICT)
		// 		}
		// 	})
		// )
	}

	/**
	 * Check if user exists and password is valid.
	 * @param user user email and password
	 * @returns Observable<UserI>
	 */
	validateUser(email: string, password: string): Observable<UserI> {
		return from(this.userRepository.findOne({ email }, { select: ['id', 'password', 'username', 'email'] })).pipe(
			switchMap((foundUser: UserI) => {
				if (foundUser) {
					return this.authService.validatePassword(password, foundUser.password).pipe(
						map((matches: boolean) => {
							if (matches) {
								const { password, ...result } = foundUser;
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

	/**
	 * Find all users in database.
	 * @returns Observable<UserI[]>
	 */
	findAll(): Observable<UserI[]> {
		return from(this.userRepository.find()).pipe(
			map((users: UserI[]) => {
				users.forEach(function (user) { delete user.password })
				return users;
			})
		);
	}

	/**
	 * Find user by email.
	 * @param email user email
	 * @returns Observable<UserI>
	 */
	findByEmail(email: string): Observable<UserI> {
		return from(this.userRepository.findOne({email}, { select: ['id', 'email', 'username', 'password', 'role']}))
	}

	/**
	 * Find user by Id.
	 * @param id user id
	 * @returns Observable<UserI>
	 */
	findOne(id: number): Observable<UserI> {
		return from(this.userRepository.findOne({id})).pipe(
			map((user: UserI) => {
				const { password, ...result } = user;
				return result;
			})
		);
	}

	/**
	 * Delete user by id.
	 * @param id user id
	 * @returns Observable<any>
	 */
	deleteUser(id: number): Observable<any> {
		return from(this.userRepository.delete(id));
	}

	/**
	 * Update user by id.
	 * @param id user id
	 * @param user user data
	 * @returns Observable<any>
	 */
	updateUser(id: number, user: UserI): Observable<any> {
		delete user.email;
		delete user.password;

		return from(this.userRepository.update(id, user));
	}

	/**
	 * Check if user with given email exists.
	 * @param email user email
	 * @returns Observable<boolean>
	 */
	mailExists(email: string): Observable<boolean> {
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
