import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
import { TransactionService } from './provider/transaction.service';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig.dev)],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class DatabaseModule {}
