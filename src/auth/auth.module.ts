import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
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
	providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
