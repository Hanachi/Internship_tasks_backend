import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from "class-validator"

import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {

	@ApiProperty({ type: String, description: 'username' })
	@IsString()
	@IsNotEmpty()
	readonly username: string
}