import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/startegies/jwt.startegy'; // Corrected path for JwtStrategy
import { UserEntity } from './entity/user.entity';
import { MailerService } from './mailer/mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MailerModule } from '@nestjs-modules/mailer';
import { asapScheduler } from 'rxjs';
//  import {Handlebars} from 'handlebars';
import { strict } from 'assert';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRoot({
    transport:{
      host:'smtp.gmail.com',
      auth:{
        user: 'azizayesha454@gmail.com',
              pass: 'ayesha123',
      },
    },
  }),
    // ConfigModule.forRoot(),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (ConfigService: ConfigService) => ({
    //     transport: {
    //       host: 'smtp.gmail.com',
    //       port: '587',
    //       auth: {
    //         user: 'azizayesha342@gmail.com',
    //         pass: 'ayesha123',
    //       },
    //     },
    //     defaults: {
    //       from: 'azizayesha961@gmail.com',
    //     },
    //     template: {
    //       dir: process.cwd() + '/src/mail/templates',
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
  // / }),
    PassportModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ayesha',
      database: 'postgres',
      entities: [UserEntity],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, MailerService],
})
export class AppModule {}
