import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginUserDto {

	@ApiProperty({ type: String, description: 'email' })
	@IsEmail()
	readonly email: string
	@ApiProperty({ type: String, description: 'password' })
	@IsNotEmpty()
	readonly password: string
}