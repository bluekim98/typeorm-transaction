import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { V01CreateUserDto } from './dto';

import { UserService } from './provider/user.service';

@Controller('v0.1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.findUser(id);
    }

    @Post()
    async createUser(@Body() createUserDto: V01CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: number) {
        return await this.userService.removeUser(id);
    }
}
