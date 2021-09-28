import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async removeAllTransaction(boards: Board[], manager?: EntityManager) {
    if (!manager) return await this.remove(boards);
    return await manager.remove(boards);
  }
}
