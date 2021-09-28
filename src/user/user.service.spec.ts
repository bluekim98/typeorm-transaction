import { Test, TestingModule } from '@nestjs/testing';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { Board } from '../board/board.entity';
import { BoardModule } from '../board/board.module';
import { BoardService } from '../board/board.service';
import { DatabaseModule } from '../database/database.module';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let boardService: BoardService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    boardService = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create user test', async () => {
    const createUserDto: CreateUserDto = { email: 'test@email.com' };
    const createdUser = await userService.save(createUserDto);
    expect(createdUser).toBeDefined();
  });

  it('remove user transaction test', async () => {
    const existingUser: User = await userService
      .findByOption({ email: 'test@email.com' })
      .then((users) => users[0]);
    const userId = existingUser.id;
    const createBoardDto: CreateBoardDto = {
      title: 'hello',
      text: 'hello typeorm',
      userId,
    };
    await boardService.save(createBoardDto);

    const { status } = await userService.removeUserAndBoard(userId);
    expect(status).toBeTruthy();

    const user: User = await userService.findById(userId);
    expect(user).not.toBeDefined();

    const boards: Board[] = await boardService.findByUserId(userId);
    expect(boards.length).toBe(0);
  });
});
