import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
// import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class MailerService{
    private transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"azizayesha454@gmail.com",
                pass:"ayesha123",
            },
        });
    }
    async sendEmail(options: { to: string; subject: string; context: { otp: string } }): Promise<void> {
        const { to, subject, context } = options;
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: 'azizayesha961@gmail.com', 
          subject: 'Your OTP code', 
          context: { otp: '123456' }
        };
     await this.transporter.sendMail(mailOptions);
      }
}