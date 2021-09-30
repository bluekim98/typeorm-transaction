import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { Post } from '@src/microservice/post/post.entity';
import { UserRepository } from './user.repository';
import { PostService } from '@src/microservice/post/provider/post.service';
import { TransactionService } from '@src/microservice/database/provider/transaction.service';
import { PaginationDto, ServiceStatusDto } from '@src/common/dto';
import { UserWhere } from '../dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly boardService: PostService,
        private readonly transactionService: TransactionService,
    ) {}

    async createUser(
        createUserDto: CreateUserDto,
    ): Promise<ServiceStatusDto<User>> {
        try {
            const user = this.toEntity(createUserDto);
            const savedUser = await this.userRepository.save(user);
            return { status: true, data: savedUser };
        } catch (error) {
            return { status: false, error };
        }
    }

    private toEntity(createUserDto: CreateUserDto): User {
        const { email } = createUserDto;

        if (!email) throw new Error();

        const user: User = { email };
        return user;
    }

    async getOne(where: UserWhere): Promise<ServiceStatusDto<User>> {
        try {
            const user = await this.userRepository.findOne(where);
            return { status: true, data: user };
        } catch (error) {
            return { status: false, error };
        }
    }

    async getMany(
        where: UserWhere,
        page?: PaginationDto,
    ): Promise<ServiceStatusDto<User>> {
        try {
            if (page?.isPage) {
                const { data: users, edge } =
                    await this.userRepository.getPagedDataWithEdge(where, page);

                return { status: true, data: users, edge };
            } else {
                const posts = await this.userRepository.find(where);
                return { status: true, data: posts };
            }
        } catch (error) {
            return { status: false, error };
        }
    }

    async removeUserAndBoard(id: number): Promise<ServiceStatusDto> {
        const user: User = await this.userRepository.findById(id);
        if (!user) return { status: false };

        const boards: Post[] = await this.boardService
            .getMany({
                userId: user.id,
            })
            .then((response) => response.data as Post[]);

        const start = async (
            manager: EntityManager,
        ): Promise<ServiceStatusDto> => {
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

    private async remove(user: User, manager?: EntityManager) {
        await this.userRepository.removeTransaction(user, manager);
    }
}
