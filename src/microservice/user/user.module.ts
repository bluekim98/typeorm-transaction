import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { PostModule } from '../post/post.module';
import { UserRepository } from './provider/user.repository';
import { UserService } from './provider/user.service';
import { UserController } from './user.controller';
import { UserProviders } from './provider/user.provider';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([UserRepository]),
        PostModule,
    ],
    controllers: [UserController],
    providers: [UserService, ...UserProviders],
    exports: [...UserProviders],
})
export class UserModule {}
