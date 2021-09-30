import { Test, TestingModule } from '@nestjs/testing';
import { PaginationDto } from '@src/common/dto';
import { UserService } from '@src/microservice/user/provider/user.service';
import { User } from '@src/microservice/user/user.entity';
import { UserModule } from '@src/microservice/user/user.module';
import { DatabaseModule } from '../../database/database.module';
import { PostWhere } from '../dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../post.entity';
import { PostModule } from '../post.module';
import { PostService } from '../provider/post.service';
import * as faker from 'faker';

describe('PostService', () => {
    let boardService: PostService;
    let userService: UserService;
    let user: User;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PostModule, DatabaseModule, UserModule],
        }).compile();

        boardService = module.get<PostService>(PostService);
        userService = module.get<UserService>(UserService);
    });

    beforeAll(async () => {
        const name = faker.random.word();
        const email = `${name}@email.com`;

        user = await userService
            .createUser({ email })
            .then((response) => response.data as User);
    });

    it('should be defined', () => {
        expect(boardService).toBeDefined();
    });

    it('save board test', async () => {
        const createPostDto: CreatePostDto = {
            title: faker.lorem.sentence(5),
            text: faker.lorem.sentence(20),
            userId: user.id,
        };

        const createdBoard: CreatePostDto = await boardService
            .createPost(createPostDto)
            .then((response) => response.data as CreatePostDto);
        expect(createdBoard).toBeDefined();
    });

    it('find posts test', async () => {
        const where: PostWhere = { userId: user.id };
        const page: PaginationDto = { count: 5, page: 1, isPage: true };
        const posts: Post[] = await boardService
            .getMany(where, page)
            .then((response) => response.data as Post[]);

        expect(posts).toBeDefined();
    });
});
