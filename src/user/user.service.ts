import { Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Board } from '../board/board.entity';
import { ServiceStatusDto } from '../common/dto';
import { TransactionService } from '../database/transaction.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardService: BoardService,
    private readonly transactionService: TransactionService,
  ) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = this.toEntity(createUserDto);
    return await this.userRepository.save(user);
  }

  private toEntity(createUserDto: CreateUserDto): User {
    const { email } = createUserDto;

    if (!email) throw new Error();

    const user: User = { email };
    return user;
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findByOption(option: any): Promise<User[]> {
    return await this.userRepository.find(option);
  }

  async remove(user: User, manager?: EntityManager) {
    await this.userRepository.removeTransaction(user, manager);
  }

  async removeUserAndBoard(id: number): Promise<ServiceStatusDto> {
    const user: User = await this.userRepository.findById(id);
    if (!user) return { status: false };

    const boards: Board[] = await this.boardService.findByUserId(user.id);

    const start = async (manager: EntityManager): Promise<ServiceStatusDto> => {
      await this.boardService.removeAll(boards, manager);
      await this.remove(user, manager);

      return { status: true };
    };

    const result = await this.transactionService.transaction(start);

    // const result = await this.transactionService.transaction(
    //   async (manager: EntityManager): Promise<ServiceStatusDto> => {
    //     await this.boardService.removeAll(boards, manager);
    //     await this.remove(user, manager);

    //     return { status: true };
    //   },
    // );

    return result;
  }
}
