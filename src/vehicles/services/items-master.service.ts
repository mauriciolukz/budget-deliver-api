import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateItemMasterDto,
  FilterItemsMasterDto,
  UpdateItemMasterDto,
} from '../dtos/item-master.dto';
import { ItemMaster } from '../entities/item-master.entity';

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

  async create(data: CreateItemMasterDto) {
    const item = await this.itemMasterRepo.count({
      where: { description: data.description },
    });
    if (item !== 0) throw new ConflictException('Registro ya existe');
    return this.itemMasterRepo.save(data);
  }

  async update(id: number, payload: UpdateItemMasterDto) {
    const item = await this.itemMasterRepo.findOneBy({ id });
    if (!item) throw new NotFoundException();
    this.itemMasterRepo.merge(item, payload);
    return this.itemMasterRepo.save(item);
  }

  async delete(id: number) {
    return this.itemMasterRepo.delete(id);
  }
}
