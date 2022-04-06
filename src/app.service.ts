import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImapService } from './modules/imap/imap.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private imapService: ImapService) {}
  getHello(): string {
    return 'Hello World!';
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleSchedule() {
    this.imapService.getEmail('good66612@gmail.com', 'Username666');
  }
}
