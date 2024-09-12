import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { JwtPayload } from 'src/interface/jwt-payload-interface';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { userId } = payload;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
