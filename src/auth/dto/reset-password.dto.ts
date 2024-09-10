
import {  MinLength,IsString } from "class-validator";

export class ResetPasswordDto {

  @IsString()
 
  username: string;

  @IsString()

  email:string;
 
  @IsString()
  
  @MinLength(6)
  newPassword: string;

}
