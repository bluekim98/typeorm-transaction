import { BaseService } from '@src/common/provider/base.service';
import { EntityManager, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends BaseService<User> {
    private getQueryBuild(): SelectQueryBuilder<User> {
        return this.createQueryBuilder(this.tableName);
    }

    async findById(id: number): Promise<User> {
        const user: User = await this.findByIds([id]).then((result) => {
            if (!result.length) return null;
            return result[0];
        });

        return user;
    }

    async removeTransaction(user: User, manager?: EntityManager) {
        if (!manager) return await this.remove(user);
        return await manager.remove(user);
    }
}
