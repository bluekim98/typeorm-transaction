import {
    Controller,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateUserDto, UserWhere } from './dto';
import { UserCommand, UserMessagePattern } from './provider/user.provider';
import { UserService } from './provider/user.service';

@UsePipes(new ValidationPipe())
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UserMessagePattern(UserCommand.FIND)
    async getUser(@Payload('where') where: UserWhere) {
        return await this.userService.getOne(where);
    }

    @UserMessagePattern(UserCommand.CREATE)
    async creatUser(@Payload('dto') dto: CreateUserDto) {
        return await this.userService.createUser(dto);
    }

    @UserMessagePattern(UserCommand.REMOVE)
    async removeUser(@Payload('id', ParseIntPipe) id: number) {
        return await this.userService.removeUserAndBoard(id);
    }
}
