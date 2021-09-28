import { Injectable } from '@nestjs/common';
import { ServiceStatusDto } from 'src/common/dto';
import { EntityManager, getConnection } from 'typeorm';

@Injectable()
export class TransactionService {
  async transaction(
    start: (manager: EntityManager) => Promise<ServiceStatusDto>,
  ): Promise<ServiceStatusDto> {
    const connection = getConnection();
    const runner = connection.createQueryRunner();

    await runner.startTransaction();
    try {
      const result = await start(runner.manager);
      await runner.commitTransaction();
      return result;
    } catch (error) {
      await runner.rollbackTransaction();
      return { status: false };
    } finally {
      await runner.release();
    }
  }
}
