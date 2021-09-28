import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id?: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}
