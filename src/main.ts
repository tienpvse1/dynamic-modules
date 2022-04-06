import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        transport: Transport.TCP,
        port: 8080,
        host: '127.0.0.1',
      },
    },
  );
  await app.listen();
}
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(8080);
// }
bootstrap();
