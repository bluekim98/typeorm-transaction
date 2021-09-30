import { IsNumber, IsOptional } from 'class-validator';

export class V01FindPostDto {
    @IsNumber()
    @IsOptional()
    userId?: number;
}
