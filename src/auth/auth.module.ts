import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { MailerService } from '../mailer/mailer.service';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
  exports: [AuthService],
})
export class AuthModule {}
//Sure! This code defines a module in a NestJS application called AuthModule. Here’s what each part does:

// Imports:

// PassportModule: Provides tools for handling authentication.
// JwtModule: Manages JSON Web Tokens (JWTs), which are used for securely transmitting information between parties. It's configured here to use a secret from environment variables and to set the token expiration to 2 days.
// Controllers:

// AuthController: This is the class that will handle incoming requests related to authentication (like logging in or registering users).
// Providers:

// AuthService: This is the class that contains the business logic for authentication (like validating users and generating tokens).
// dotenv.config():

// Loads environment variables from a .env file so that the JWT_SECRET can be used in the JwtModule configuration.
// @Module Decorator:

// imports: Lists modules that this module depends on. Here, it's importing PassportModule and JwtModule.
// controllers: Lists the controllers that belong to this module. Here, it's the AuthController.
// providers: Lists the services or providers used by this module. Here, it's the AuthService.
// In summary, AuthModule sets up everything needed for handling authentication in your application, including the necessary tools and services.
