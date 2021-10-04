import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity()
class Message {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public content: string;

	@ManyToOne(() => UserEntity)
	public author: UserEntity;
}

export default Message;