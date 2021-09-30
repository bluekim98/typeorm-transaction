import {
    ClientProxyFactory,
    MessagePattern,
    Transport,
} from '@nestjs/microservices';

export enum PostCommand {
    FIND = 'FIND_POST',
    FIND_ALL = 'FIND_ALL_POST',
    CREATE = 'CREATE_POST',
    REMOVE = 'REMOVE_POST',
}

export const PostConstant = { name: 'POST_SERVICE', role: 'POST' };

export const PostProviders = [
    {
        provide: PostConstant.name,
        useFactory: () => {
            return ClientProxyFactory.create({ transport: Transport.TCP });
        },
    },
];

export const PostMessagePattern = (command: PostCommand) =>
    MessagePattern({ role: PostConstant.role, cmd: command });

export const postPatternOf = (command: PostCommand) => {
    return { role: PostConstant.role, cmd: command };
};
