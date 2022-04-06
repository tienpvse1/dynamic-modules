import { Body, Controller, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { EmailService } from '../email/email.service';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@Crud({
  model: {
    type: Account,
  },
  dto: {
    create: CreateAccountDto,
    update: UpdateAccountDto,
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
})
export class AccountController {
  constructor(
    readonly service: AccountService,
    private emailService: EmailService,
  ) {}

  @Post('send-email')
  async create(@Body() payload: SendEmailDto) {
    const account = await this.service.repository.findOne({
      where: { email: payload.from.address },
    });
    return this.emailService.sendEmail(account.email, account.password, {
      from: payload.from.address,
      to: payload.to[0].address,
      html: payload.html,
      subject: payload.subject,
      date: payload.sendAt,
    });
  }
}
