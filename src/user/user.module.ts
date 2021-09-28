import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { BoardModule } from '../board/board.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserRepository]),
    BoardModule,
  ],
  providers: [UserService],
})
export class UserModule {}
