import { Module } from '@nestjs/common';
import { PostModule as CorePostModule } from '@src/microservice/post/post.module';
import { PostController } from './post.controller';
import { PostService } from './provider/post.service';

@Module({
    imports: [CorePostModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
