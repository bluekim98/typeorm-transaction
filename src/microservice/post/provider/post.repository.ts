import { BaseService } from '@src/common/provider/base.service';
import { EntityManager, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Post } from '../post.entity';

@EntityRepository(Post)
export class PostRepository extends BaseService<Post> {
    private getQueryBuild(): SelectQueryBuilder<Post> {
        return this.createQueryBuilder(this.tableName);
    }

    async removeAllTransaction(boards: Post[], manager?: EntityManager) {
        if (!manager) return await this.remove(boards);
        return await manager.remove(boards);
    }
}
