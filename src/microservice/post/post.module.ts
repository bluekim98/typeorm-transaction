import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/common/common.module';
import { PostController } from './post.controller';
import { PostProviders } from './provider/post.provider';
import { PostRepository } from './provider/post.repository';
import { PostService } from './provider/post.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository]), CommonModule],
    controllers: [PostController],
    providers: [PostService, ...PostProviders],
    exports: [PostService, ...PostProviders],
})
export class PostModule {}
