export interface UserI {
	id?: number
	username?: string
	email?: string
	password?: string
	role?: UserRole
	googleUser?: boolean
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user'
}