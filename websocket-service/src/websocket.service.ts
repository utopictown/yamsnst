import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketService {
  getHello(data: string): string {
    return `Hello ${data}!`;
  }
}
