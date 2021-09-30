import { Repository } from 'typeorm';
import { EdgeDto, PaginationDto } from '../dto';
import { WhereDto } from '../dto/query.dto';
import { makeWhere } from '../lib/lib';

export class BaseService<E> extends Repository<E> {
    get tableName(): string {
        return this.metadata.tableName;
    }

    get pkName(): string {
        return this.metadata.primaryColumns[0].databaseName;
    }

    async getPagedDataWithEdge<T extends WhereDto>(
        whereDto: T,
        pageDto: PaginationDto,
    ): Promise<{ data: E[]; edge: EdgeDto }> {
        const data = await this.getPagedData(whereDto, pageDto);
        const edge = await this.getEdge(whereDto, pageDto);
        return { data, edge };
    }

    async getEdge<T extends WhereDto>(
        where: T,
        pageDto: PaginationDto,
    ): Promise<EdgeDto> {
        const totalCount = await this.count(where);
        const pageCount = Math.ceil(totalCount / pageDto.count);
        const page = pageDto.page;

        const edge: EdgeDto = {
            hasNextPage: Number(page) < Number(pageCount),
            hasPreviousPage:
                Number(page) === 1 || Number(page) > Number(pageCount)
                    ? false
                    : true,
            currentPage:
                Number(pageCount) > Number(page)
                    ? Number(page)
                    : Number(pageCount),
            pageCount: Number(pageCount),
            totalCount: Number(totalCount),
        };

        return edge;
    }

    async getPagedData<T extends WhereDto>(
        whereDto: T,
        pageDto: PaginationDto,
    ): Promise<E[]> {
        const where = makeWhere(whereDto, this.tableName);
        return await this.createQueryBuilder(this.tableName)
            .where(where.where, where.param)
            .offset((pageDto.page - 1) * pageDto.count)
            .limit(pageDto.count)
            .getRawMany();
    }
}
