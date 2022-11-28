import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('/items')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('WEBSOCKET') private wsClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const created = await this.appService.create(createItemDto);
    this.wsClient.emit('item_created', created.name);
    return created;
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateItemDto) {
    try {
      const res = await this.appService.update(id, updateOrderDto);
      this.wsClient.emit('item_updated', `${id} is updated`);
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.appService.remove(id);
    this.wsClient.emit('item_deleted', `${id} is deleted`);
    return res;
  }
}
