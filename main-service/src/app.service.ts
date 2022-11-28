import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item as ItemBackup } from './entities/item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>,
    @InjectRepository(ItemBackup, 'backup')
    private itemsBackupRepository: Repository<ItemBackup>,
  ) {}

  async create(createItemData: CreateItemDto) {
    const item = new Item();
    item.name = createItemData.name;
    item.contact = createItemData.contact;
    const saved = await this.itemModel.create(item);

    const itemBackup = new ItemBackup();
    itemBackup.mainId = String(saved.id);
    itemBackup.name = createItemData.name;
    itemBackup.contact = createItemData.contact;
    this.itemsBackupRepository.save(itemBackup);
    return saved;
  }

  async findAll() {
    return await this.itemModel.find();
  }

  async findOne(id: string) {
    return await this.itemModel.findOne({ id });
  }

  async update(id: string, updateProductDto: UpdateItemDto) {
    try {
      await this.itemModel.findByIdAndUpdate(id, updateProductDto);
      const itemBackup = await this.itemsBackupRepository.findOne({
        where: { mainId: id },
      });
      if (itemBackup)
        this.itemsBackupRepository.update({ mainId: id }, updateProductDto);
      return true;
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: string) {
    await this.itemModel.deleteOne({ id: id });
    await this.itemsBackupRepository.delete({ mainId: id });
    return true;
  }
}
