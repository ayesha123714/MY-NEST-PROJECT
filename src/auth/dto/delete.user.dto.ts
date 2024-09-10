import { IsString } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  password: string;

  @IsString()
  userid: string;
  @IsString()
    username:string;
    @IsString()
    email:string;
}
