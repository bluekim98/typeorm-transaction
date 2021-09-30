import { Module } from '@nestjs/common';
import { V0R1Module } from './v0.1/v0r1.module';
import { MicroserviceModule } from './microservice/microservice.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [MicroserviceModule, V0R1Module, CommonModule],
})
export class AppModule {}
