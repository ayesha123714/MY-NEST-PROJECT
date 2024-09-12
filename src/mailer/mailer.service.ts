import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
// import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class MailerService {
  constructor() {}
  async sendEmail(email: string, subject: string, text: string) {
    try {
      console.log(process.env.MAILER_FROM);
      console.log(process.env.EMAIL_PASSWORD_);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILER_FROM,
          pass: process.env.EMAIL_PASSWORD_,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: subject,
        text: text,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
