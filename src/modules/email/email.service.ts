import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Provider } from 'src/constance/provider';

@Injectable()
export class EmailService {
  constructor(
    @Inject(Provider.EMAIL_TRANSPORT) public options: SMTPTransport.Options,
  ) {}

  sendEmail(email: string, password: string, mail: Mail.Options) {
    const transport = createTransport({
      ...this.options,
      auth: {
        user: email,
        pass: password,
      },
    });
    return transport.sendMail(mail);
  }
}
