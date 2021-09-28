import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
