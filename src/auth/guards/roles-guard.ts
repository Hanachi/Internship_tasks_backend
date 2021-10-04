import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { UserI } from '../../user/models/user.interface';
import { UserService } from '../../user/service/user-service/user.service';


@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		
		@Inject(forwardRef(() => UserService))
		// @Inject(forwardRef(() => UserHelperService))
		private userService: UserService
	) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());

		if(!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user: UserI = request.user.user;

		return this.userService.findOne(user.id).pipe(
			map((user: UserI) => {
				const hasRole = () => roles.indexOf(user.role) > -1;
				let hasPermission: boolean = false;

				if(hasRole()) {
					hasPermission = true;
				}
				return user && hasPermission;
			})
		)
	}
}