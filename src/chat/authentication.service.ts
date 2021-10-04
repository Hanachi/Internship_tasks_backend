import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/service/user-service/user.service';
// import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	public async getUserFromAuthenticationToken(token: string) {
		const payload = this.jwtService.verify(token, {
			secret: process.env.JWT_SECRET
		});
		if (payload.id) {
			return this.userService.findOne(payload.id);
		}
	}

	// ...
}