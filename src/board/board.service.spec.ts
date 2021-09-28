import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { Board } from './board.entity';
import { BoardModule } from './board.module';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

describe('BoardService', () => {
  let boardService: BoardService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BoardModule, DatabaseModule],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
  });

  //   it('save board test', async () => {
  //     const createBoardDto: CreateBoardDto = {
  //       title: 'hello',
  //       text: 'hello typeorm',
  //       userId: 1,
  //     };
  //     const createdBoard = await boardService.save(createBoardDto);
  //     expect(createdBoard).toBeDefined();
  //   });

  //   it('find board by userId test', async () => {
  //     const userId = 1;
  //     const boards: Board[] = await boardService.findByUserId(userId);
  //     expect(boards).toBeDefined();
  //   });
});
