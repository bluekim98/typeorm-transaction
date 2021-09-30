import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Post } from '../post.entity';
import { PostRepository } from './post.repository';
import { EdgeDto, PaginationDto, ServiceStatusDto } from '@src/common/dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostWhere } from '../dto/post-where.dto';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async createPost(
        createPostDto: CreatePostDto,
    ): Promise<ServiceStatusDto<Post>> {
        try {
            const post = this.toEntity(createPostDto);
            const createdPost = await this.postRepository.save(post);
            return { status: true, data: createdPost };
        } catch (error) {
            return { status: false, error };
        }
    }

    private toEntity(createPostDto: CreatePostDto): Post {
        const { title, text, userId } = createPostDto;
        const board: Post = {
            title,
            text,
            userId,
        };
        return board;
    }

    async getOne(where: PostWhere): Promise<ServiceStatusDto<Post>> {
        try {
            const post = await this.postRepository.findOne(where);
            return { status: true, data: post };
        } catch (error) {
            return { status: false, error };
        }
    }

    async getMany(
        where: PostWhere,
        page?: PaginationDto,
    ): Promise<ServiceStatusDto<Post>> {
        try {
            if (page?.isPage) {
                const { data: posts, edge } =
                    await this.postRepository.getPagedDataWithEdge(where, page);

                return { status: true, data: posts, edge };
            } else {
                const posts = await this.postRepository.find(where);
                return { status: true, data: posts };
            }
        } catch (error) {
            return { status: false, error };
        }
    }

    async removeAll(boards: Post[], manager?: EntityManager) {
        return await this.postRepository.removeAllTransaction(boards, manager);
    }
}
