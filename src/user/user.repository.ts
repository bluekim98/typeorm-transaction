import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
