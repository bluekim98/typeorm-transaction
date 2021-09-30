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

    private async send(command: PostCommand, payload: any) {
        return await firstValueFrom(
            this.postClient.send(postPatternOf(command), payload),
        );
    }

    async getMany(findDto: V01FindPostDto, page?: PaginationDto) {
        const payload = { where: findDto, page };
        return await this.send(PostCommand.FIND_ALL, payload);
    }
}
