import { Controller } from '@nestjs/common';
import { ImapService } from './imap.service';

@Controller('imap')
export class ImapController {
  constructor(private readonly imapService: ImapService) {}
}
