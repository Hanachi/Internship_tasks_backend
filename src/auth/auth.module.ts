import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './guards/google-strategy';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles-guard';
import { AuthService } from './services/auth.service';

@Module({
	imports: [
		forwardRef(() => UserModule),
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
				signOptions: {
					expiresIn: process.env.EXPIRES_IN
				}
			})
		})
	],
	providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy, GoogleStrategy],
	exports: [AuthService]
})
export class AuthModule {}
