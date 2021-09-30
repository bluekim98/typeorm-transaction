import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @IsInt()
    @Min(0)
    @Max(100)
    count?: number = 10;

    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsBoolean()
    isPage?: any = true;
}

export class EdgeDto {
    hasNextPage = false;
    hasPreviousPage = false;
    currentPage = 1;
    pageCount = 1;
    totalCount = 0;
}
