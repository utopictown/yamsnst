import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WebsocketModule } from './websocket.module';

async function bootstrap() {
  console.log(process.env.WEBSOCKET_SERVICE_PORT, 'port');
  const port = process.env.WEBSOCKET_SERVICE_PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WebsocketModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: Number(port) },
    },
  );
  app.listen();
}
bootstrap();
