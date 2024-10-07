import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerService } from './mailer/mailer.service';
import { validate } from './env.validate';
import { PassportModules } from './passport/passport.module';
import { ProductModule } from './product/product.module'
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [ProductModule, 
    AuthModule,
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
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, 
    }),
    EntityModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'azizayesha961@gmail.com',
          pass: 'ayesha1234',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
 

})
export class AppModule {}
