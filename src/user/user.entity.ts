import { Board } from '../board/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id?: number;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @OneToMany(() => Board, (board) => board.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  boards?: Board[];
}
