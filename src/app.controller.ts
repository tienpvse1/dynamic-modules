import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ImapService } from './modules/imap/imap.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private imapService: ImapService,
  ) {}
}
