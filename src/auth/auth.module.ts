import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
				signOptions: {
					expiresIn: process.env.EXPIRES_IN
				}
			})
		})
	],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}
