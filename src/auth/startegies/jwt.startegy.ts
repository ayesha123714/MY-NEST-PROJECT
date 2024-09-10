import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { JwtPayload } from '../interface/jwt-payload-interface';
import { Repository } from 'typeorm';
// import { use } from 'passport';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true if you want to ignore expired tokens
      secretOrKey: "process.env.JWT_SECRET",
    });
  }

 async validate(payload: JwtPayload):Promise<UserEntity>{
  const {userId} = payload;
  const user = await this.userRepository.findOne({
    where:{id:userId},
  });
  if(!user){
    throw new UnauthorizedException('user not found');
  }
  return user;
 }
}
//  {
//     console.log('Inside JwtStrategy validate');
//     console.log('Payload:', payload); // Correctly logs the payload
//     return payload; // You can return the payload or attach additional data if needed
//   }


