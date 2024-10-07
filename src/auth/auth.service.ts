import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { signUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '../mailer/mailer.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthService {
  productRepository: any;
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(signUpDto: signUpDto): Promise<any> {
    const { email, password, username } = signUpDto;

    const emailInUse = await this.userRepository.findOne({
      where: { email },
    });

    if (emailInUse) {
      throw new BadRequestException('Email is already in use');
    }
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    const payload = { username: newUser.username, sub: newUser.id };

    const token = this.jwtService.sign(payload);
    return {
      message: 'user successfully registerd',
      user: newUser,
      access_token: token,
    };
  }
  async login(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password, username } = userLoginDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { username: user.username, userId: user.id };
    const access_token = this.jwtService.sign(payload);
    const userId = user.id;
    return { userId, username, email, access_token };
  }
  
  async getAllUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  async getUserById(userId: string): Promise<any> {
    
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.username = updateUserDto.username || user.username;
    user.email = updateUserDto.email || user.email;
    user.updatedAt = new Date();
    await this.userRepository.save(user);  
    return {
      success: true,
      message: 'User updated successfully',
      data: user,
    };
  }
  
  
  
  async deleteUser(userId: string): Promise<any> {
    const finduser = await this.userRepository.findOne({
      where: { id: userId } 
    });
    const user = await this.userRepository.delete(userId)
    if(!finduser)
      throw new NotFoundException('This user with ID ${userId} does not exist')

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp; await this.userRepository.save(user);
    const emailSent = await this.mailerService.sendEmail(email, 'OTP', `Your otp is: ${otp}`);
    
    if(emailSent){
      return {
        message: `Password reset OTP has been sent to ${email}`,
        otp: otp, 
      };
    }
    else{
      throw new BadRequestException('There was an issue sending email');
    }
    
  }
  
  // verfication of otp

  // message: OTP has been to sent to your email address

  // async sendEmailOtp(sendEmailOtpDto: SendEmailOtpDto): Promise<any> {
  //   const { email } = sendEmailOtpDto;
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //   await this.mailerService.sendEmail({
  //     to: email,
  //     subject: 'Your OTP Code',
  //     context: { otp },
  //   });
  //   return { message: 'OTP has been sent to your email address', otp: otp };
  // }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    const { email, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password cannot be the same as the old one',
      );
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return {
      success: true,
      message: 'Password reset successfully',
      data: user,
    };
  }


  
}

//The login method verifies the user's email and password.
// If the email is not found, it throws a NotFoundException.
// If the password is incorrect, it throws an UnauthorizedException.
// If both are correct, it generates a JWT token containing the user's information and returns it along with the user's username and email.
// The client can then use this token to authenticate further requests to the server.
