import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Req,
  UseGuards,
  HttpStatus,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { Request } from 'express';
import { signUpDto } from './dto/signup.dto';
import { UserLoginDto } from './dto/login.dto';
import { UserEntity } from 'src/entity/user.entity';

import { DeleteUserDto } from './dto/delete.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { MailerService } from '../mailer/mailer.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDato: signUpDto): Promise<any> {
    return await this.authService.signUp(signupDato);
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getAllUsers')
  async getAllUser(): Promise<any> {
    return await this.authService.getAllUsers();
  }
  // @Get('getUserById/:id')
  // async getUserById(@Param('id') id: string) {
  //   return this.authService.getUserById(id);
  // }
@UseGuards(JwtAuthGuard)
  @Get('getUserById/:id')
   async getUserById(@Param('id') userId: string): Promise<any> {
    return await this.authService.getUserById(userId);
   }
@UseGuards(JwtAuthGuard)
  @Put('updateUser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    updateUserDto.userid = id;
    return await this.authService.updateUser(updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('deleteUser/:id')
  async deleteUserById(
    @Param('id') id: string,
  ): Promise<any> {
    return await this.authService.deleteUser(id);
  }

@Post('forgot-password')
async forgotPassword(@Body('email') email: string) {
  return this.authService.forgotPassword(email);
}

 @Put('reset-password')
async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  return this.authService.resetPassword(resetPasswordDto);
}
// @Post('sendEmailOtp')
// async sendEmailOtp(@Body() sendEmailOtpDto: SendEmailOtpDto): Promise<any> {
//   return this.authService.sendEmailOtp(sendEmailOtpDto);
// }
}


//The entire code defines a secure route that only authenticated users (those with valid JWT tokens) can access. This structure is typical for protected routes in applications where certain resources or actions should only be available to authenticated users.

//a constructor in NestJS is a special method that gets called when you create a new object from a class. It sets things up and makes sure the class has everything it needs to do its job.
//This code defines a simple authentication controller in a NestJS application. The controller handles requests related to authentication, such as logging in. Let's break it down step by step:
// 1. Imports:
// @Controller, @Get, @Post, @Body, and HttpException are decorators and classes from NestJS that help define routes and handle exceptions.
// AuthService is a service class that handles the actual authentication logic.
// AuthPayloadDto is a Data Transfer Object (DTO) that defines the structure of the data expected when a user tries to log in.
//@Controller('/auth'): This decorator defines a controller with a base route of /auth. All routes inside this controller will start with /auth.
//The constructor injects the AuthService into the controller. This allows the controller to use the authentication methods defined in the AuthService.
//@Post('/login'): This route handles POST requests to /auth/login. It’s used for logging in a user.
//login(@Body() authPayload: AuthPayloadDto): This method expects data (e.g., username and password) to be sent in the body of the request. The @Body() decorator extracts this data and assigns it to the authPayload variable.
//Console Log: console.log({authPayload}) logs the incoming login data to the console for debugging purposes.
//Validation: The validateUser(authPayload) method from the AuthService is called to check if the provided credentials (like username and password) are correct.
//Error Handling: If the validateUser method returns null or undefined, meaning the credentials are invalid, an HttpException is thrown with the message 'invalid credentials' and a status code of 401 (Unauthorized).
//Return: If the user is successfully validated, the user data is returned.
//summary
//This code defines an authentication controller in a NestJS app.
//POST /auth/login: Handles login requests. It checks if the provided login details are correct using the AuthService. If the details are wrong, it throws an error. If the details are correct, it returns the user information.
