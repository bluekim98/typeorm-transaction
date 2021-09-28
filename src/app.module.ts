import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [DatabaseModule, UserModule, BoardModule],
})
export class AppModule {}
