import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class WhereDto {
    @IsInt()
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMaxSize(300)
    @ArrayMinSize(1)
    ids?: number[];
}
