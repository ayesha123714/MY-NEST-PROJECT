import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entity/user.entity';
import { MailerService } from './mailer/mailer.service';
import { validate } from './env.validate';
import { PassportModules } from './passport/passport.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    PassportModules,
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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'azizayesha454@gmail.com',
          pass: 'ayesha123',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
