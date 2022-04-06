import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Crud } from '@nestjsx/crud';
import { Webhook } from './entities/webhook.entity';
@Controller('webhook')
@Crud({
  model: {
    type: Webhook,
  },
  dto: {
    create: CreateWebhookDto,
    update: UpdateWebhookDto,
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'uuid',
    },
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
})
export class WebhookController {
  constructor(readonly service: WebhookService) {}

  @Post()
  async create(@Body() dto: CreateWebhookDto) {
    const count = await this.service.count();
    if (count > 0)
      throw new BadRequestException('please use patch method to update url');
    return this.service.repository.create(dto).save();
  }
}
