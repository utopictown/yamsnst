import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ItemsGateway } from './items.gateway';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' })],
  controllers: [WebsocketController],
  providers: [WebsocketService, ItemsGateway],
})
export class WebsocketModule {}
