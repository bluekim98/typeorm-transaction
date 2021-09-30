import { Post } from '../post/post.entity';
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

    @Column({ name: 'email', type: 'varchar', unique: true })
    email: string;

    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    boards?: Post[];
}
