import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 360000000,
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [JwtModule, JwtStrategy],
  providers: [JwtStrategy],
})
export class PassportModules {}
