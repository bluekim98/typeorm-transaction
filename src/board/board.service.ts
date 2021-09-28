import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async save(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.toEntity(createBoardDto);
    return await this.boardRepository.save(board);
  }

  private toEntity(createBoardDto: CreateBoardDto): Board {
    const { title, text, userId } = createBoardDto;
    const board: Board = {
      title,
      text,
      userId,
    };
    return board;
  }

  async findByUserId(userId: number): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find({ userId });
    return boards;
  }

  async removeAll(boards: Board[], manager?: EntityManager) {
    return await this.boardRepository.removeAllTransaction(boards, manager);
  }
}
