import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserI } from 'src/user/models/user.interface';

@Injectable()
export class UserHelperService {

	createUserDtoToEntity(createUserDto: CreateUserDto): Observable<UserI> {
		return of({
			email: createUserDto.email,
			username: createUserDto.username,
			password: createUserDto.password
		})
	}

}
