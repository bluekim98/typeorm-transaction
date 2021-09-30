import { WhereDto } from '@src/common/dto';
import { IsInt, IsOptional } from 'class-validator';

export class PostWhere extends WhereDto {
    @IsInt()
    @IsOptional()
    userId?: number;
}
