import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ItemsGateway } from './items.gateway';

@Controller()
export class WebsocketController {
  constructor(private itemsGateway: ItemsGateway) {}

  @EventPattern('item_created')
  itemCreatedNotifier(data: string) {
    this.itemsGateway.broadcast(data);
  }

  @EventPattern('item_updated')
  itemUpdatedNotifier(data: string) {
    this.itemsGateway.broadcast(data);
  }

  @EventPattern('item_deleted')
  itemDeletedNotifier(data: string) {
    this.itemsGateway.broadcast(data);
  }
}
