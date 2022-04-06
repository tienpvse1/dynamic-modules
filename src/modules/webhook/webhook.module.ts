import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webhook } from './entities/webhook.entity';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [TypeOrmModule.forFeature([Webhook])],
})
export class WebhookModule {}
