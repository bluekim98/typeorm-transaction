import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceStatusDto } from '@src/common/dto';
import { CreateUserDto } from '@src/microservice/user/dto';
import {
    UserCommand,
    userPatternOf,
} from '@src/microservice/user/provider/user.provider';
import { User } from '@src/microservice/user/user.entity';
import { firstValueFrom } from 'rxjs';
import { V01CreateUserDto } from '../dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) {}

    async findUser(id: number): Promise<ServiceStatusDto<User>> {
        const payload = {
            where: { id },
        };

        return await firstValueFrom(
            this.userClient.send(userPatternOf(UserCommand.FIND), payload),
        );
    }

    async createUser(
        createUserDto: V01CreateUserDto,
    ): Promise<ServiceStatusDto<User>> {
        const dto = this.toMicroserviceCreateUserDto(createUserDto);
        const payload = {
            dto,
        };

        return await firstValueFrom(
            this.userClient.send(userPatternOf(UserCommand.CREATE), payload),
        );
    }

    private toMicroserviceCreateUserDto(
        createUserDto: V01CreateUserDto,
    ): CreateUserDto {
        return {
            email: createUserDto.email,
        };
    }

    async removeUser(id: number): Promise<ServiceStatusDto> {
        const payload = {
            id,
        };

        return await firstValueFrom(
            this.userClient.send(userPatternOf(UserCommand.REMOVE), payload),
        );
    }
}
