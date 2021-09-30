import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@src/common/dto';
import {
    PostCommand,
    postPatternOf,
} from '@src/microservice/post/provider/post.provider';
import { firstValueFrom } from 'rxjs';
import { V01FindPostDto } from '../dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    ) {}

    async getMany(findDto: V01FindPostDto, page?: PaginationDto) {
        return await firstValueFrom(
            this.postClient.send(postPatternOf(PostCommand.FIND_ALL), {
                where: findDto,
                page,
            }),
        );
    }
}
