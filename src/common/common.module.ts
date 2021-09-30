import { Module } from '@nestjs/common';
import { BaseService } from './provider/base.service';

@Module({
    providers: [BaseService],
    exports: [BaseService],
})
export class CommonModule {}
