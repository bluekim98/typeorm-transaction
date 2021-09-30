import { WhereDto } from '@src/common/dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserWhere extends WhereDto {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;
}
