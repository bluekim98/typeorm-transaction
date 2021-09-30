import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PaginationDto } from '@src/common/dto';
import { PostWhere } from './dto';
import { PostCommand, PostMessagePattern } from './provider/post.provider';
import { PostService } from './provider/post.service';

@UsePipes(new ValidationPipe())
@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @PostMessagePattern(PostCommand.FIND_ALL)
    async findPost(
        @Payload('where') where: PostWhere,
        @Payload('page') page: PaginationDto,
    ) {
        return await this.postService.getMany(where, page);
    }
}
