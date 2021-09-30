import { Module } from '@nestjs/common';
import { UserModule as CoreUserModule } from '@src/microservice/user/user.module';
import { UserService } from './provider/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [CoreUserModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
