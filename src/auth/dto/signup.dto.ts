import { IsEmail,IsString,MinLength } from "class-validator";
import { Any } from "typeorm";
export class signUpDto{
    @IsString()
    username:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    password: string;
} 
