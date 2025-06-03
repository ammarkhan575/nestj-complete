import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    mobile: number;

    @IsString()
    @IsIn(['male', 'female'])
    @IsOptional()
    gender: string;

    @IsNumber()
    @Min(1)
    @Max(120)
    @IsOptional()
    age: number;
}