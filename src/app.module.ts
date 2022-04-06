import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { EmailModule } from './modules/email/email.module';
import { ImapModule } from './modules/imap/imap.module';
import { WebhookModule } from './modules/webhook/webhook.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'prepared',
      entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
      logger: 'advanced-console',
      synchronize: true,
      logging: false,
    }),
    AccountModule,
    EmailModule.forRoot({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    }),
    ImapModule.forRoot({
      tlsOptions: {
        rejectUnauthorized: false,
      },
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      authTimeout: 10000,
    }),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
