import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from '@src/common/dto';
import { PostService } from './provider/post.service';

@Controller('v0.1/post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getAllPosts(@Query() page: PaginationDto) {
        return await this.postService.getMany({}, page);
    }
}
