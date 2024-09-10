import { IsEmail,IsString,IsNotEmpty } from "class-validator";
export class SendEmailOtpDto{
    @IsEmail() 
    @IsNotEmpty()
    email:string;
    @IsString() 
    @IsNotEmpty()
    username:string;
    
    @IsString() 
    @IsNotEmpty()
    password:string;
    @IsString()
    @IsNotEmpty({ message: 'OTP should not be empty' })
    otp: string;kj

    

}