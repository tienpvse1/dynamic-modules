import { DynamicModule, Module } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Provider } from 'src/constance/provider';
import { EmailService } from './email.service';
export const TRANSPORT_OPTION = 'transport-options';
@Module({})
export class EmailModule {
  static forRoot(options: Partial<SMTPTransport.Options>): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: Provider.EMAIL_TRANSPORT,
          useValue: options,
        },
        EmailService,
      ],
      exports: [EmailService],
      global: true,
    };
  }
}
