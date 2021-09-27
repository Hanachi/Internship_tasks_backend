import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { UserI } from 'src/user/models/user.interface';

const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {

	constructor(
		private readonly jwtService: JwtService
	){}

	generateJWT(user: UserI): Observable<string> {
		return from(this.jwtService.signAsync({ user }))
	}

	hashPassword(password: string): Observable<string> {
		return from<string>(bcrypt.hash(password, 12));
	}

	validatePassword(password: string, storedPasswordHash: string): Observable<any | boolean> {
		return from<any | boolean>(bcrypt.compare(password, storedPasswordHash))
	}
}
