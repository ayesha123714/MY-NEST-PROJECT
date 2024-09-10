
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';


@Controller()
export class AppController {
  authService: any;
  constructor() {}

  // @Get('/auth/signup')
  // getHello(): string {
  //   return 'hello world';
  // }
  @Get()
  sendMail():void{
    return this.authService.sendMail()
  }
}

