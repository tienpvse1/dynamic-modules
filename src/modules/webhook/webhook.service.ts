import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';

@Injectable()
export class WebhookService extends TypeOrmCrudService<Webhook> {
  constructor(
    @InjectRepository(Webhook) public repository: Repository<Webhook>,
  ) {
    super(repository);
  }
}
