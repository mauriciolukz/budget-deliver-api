import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateItemMasterDto,
  FilterItemsMasterDto,
  UpdateItemMasterDto,
} from '../dtos/item-master.dto';
import { ItemMaster } from '../models/item-master.entity';

@Injectable()
export class ItemsMasterService {
  constructor(
    @InjectRepository(ItemMaster)
    private itemMasterRepo: Repository<ItemMaster>,
  ) {}

  async findAll({ limit, offset }: FilterItemsMasterDto) {
    const [items, records] = await this.itemMasterRepo.findAndCount({
      take: limit,
      skip: offset,
    });
    return { records, items };
  }

  findById(id: number) {
    return this.itemMasterRepo.findOneBy({ id });
  }

  create(data: CreateItemMasterDto) {
    return this.itemMasterRepo.save(data);
  }

  async update(id: number, payload: UpdateItemMasterDto) {
    const item = await this.itemMasterRepo.findOneBy({ id });
    if (!item) throw new NotFoundException('Registro no encontrado');
    this.itemMasterRepo.merge(item, payload);
    return this.itemMasterRepo.save(item);
  }

  async delete(id: number) {
    return this.itemMasterRepo.delete(id);
  }
}
