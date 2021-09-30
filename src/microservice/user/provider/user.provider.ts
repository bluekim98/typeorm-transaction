import {
    ClientProxyFactory,
    MessagePattern,
    Transport,
} from '@nestjs/microservices';

export enum UserCommand {
    FIND = 'FIND_USER',
    CREATE = 'CREATE_USER',
    REMOVE = 'REMOVE_USER',
}

export const UserConstant = { name: 'USER_SERVICE', role: 'USER' };

export const UserProviders = [
    {
        provide: UserConstant.name,
        useFactory: () => {
            return ClientProxyFactory.create({ transport: Transport.TCP });
        },
    },
];

export const UserMessagePattern = (command: UserCommand) =>
    MessagePattern({ role: UserConstant.role, cmd: command });

export const userPatternOf = (command: UserCommand) => {
    return { role: UserConstant.role, cmd: command };
};
