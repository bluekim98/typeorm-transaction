import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from '@src/microservice/post/dto/create-post.dto';
import { Post } from '../../post/post.entity';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { UserService } from '../provider/user.service';
import { PostService } from '@src/microservice/post/provider/post.service';
import { UserWhere } from '../dto';
import { PostWhere } from '@src/microservice/post/dto';
import * as faker from 'faker';

describe('UserService', () => {
    let userService: UserService;
    let boardService: PostService;
    let email: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule, DatabaseModule],
        }).compile();

        userService = module.get<UserService>(UserService);
        boardService = module.get<PostService>(PostService);
    });

    beforeAll(async () => {
        const name = faker.random.word();
        email = `${name}@email.com`;
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('create user test', async () => {
        const createUserDto: CreateUserDto = { email };
        const createdUser = await userService.createUser(createUserDto);
        expect(createdUser).toBeDefined();
    });

    it('find user test', async () => {
        const where: UserWhere = {
            email,
        };
        const response = await userService.getOne(where);

        const user: User = response.data as User;

        expect(response.status).toBeTruthy();
        expect(user).toBeDefined();
    });

    it('remove user transaction test', async () => {
        const where: UserWhere = {
            email,
        };

        const existingUser: User = await userService
            .getOne(where)
            .then((response) => response.data as User);

        const userId = existingUser.id;
        const createBoardDto: CreatePostDto = {
            title: 'hello',
            text: 'hello typeorm',
            userId,
        };
        await boardService.createPost(createBoardDto);

        const { status } = await userService.removeUserAndBoard(userId);
        expect(status).toBeTruthy();

        const whereAfterRemoved: UserWhere = { id: userId };
        const user: User = await userService
            .getOne(whereAfterRemoved)
            .then((response) => response.data as User);

        expect(user).not.toBeDefined();

        const findPostWhere: PostWhere = { userId };
        const posts: Post[] = await boardService
            .getMany(findPostWhere)
            .then((response) => response.data as Post[]);
        expect(posts.length).toBe(0);
    });
});
