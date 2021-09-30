import { IsEmail, IsString } from 'class-validator';

export class V01CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
}
