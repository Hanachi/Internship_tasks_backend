import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class CreateUserDto {

	@ApiProperty({ type: String, description: 'username' })
	@IsString()
	@IsNotEmpty()
	readonly username: string
	@ApiProperty({ type: String, description: 'email' })
	@IsEmail()
	readonly email: string
	@ApiProperty({ type: String, description: 'password' })
	@IsNotEmpty()
	readonly password: string
}