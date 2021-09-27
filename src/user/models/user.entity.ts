import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";

@Entity()
export class UserEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true})
	password: string;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: UserRole

	@BeforeInsert()
	emailToLowerCase() {
		this.email = this.email?.toLowerCase();
	}

}