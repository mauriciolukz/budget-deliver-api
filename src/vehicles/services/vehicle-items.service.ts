import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dataSource } from '../../db/dataSource';
import { CreateVehicleItemsDto } from '../dtos/vehicle-item.dto';
import { ItemMaster } from '../models/item-master.entity';
import { VehicleItem } from '../models/vehicle-item.entity';
import { Vehicle } from '../models/vehicle.entity';
import { IVehicleItem } from '../types/vehicle-item';

@Injectable()
export class VehicleItemsService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(VehicleItem)
    private vehicleItemRepo: Repository<VehicleItem>,
    @InjectRepository(ItemMaster)
    private itemMasterRepo: Repository<ItemMaster>,
  ) {}

  async update(vehicleId: number, payload: CreateVehicleItemsDto) {
    const vehicle = await this.vehicleRepo.findOneBy({ id: vehicleId });
    if (!vehicle) throw new NotFoundException('Vehiculo no encontrado');
    const vehicleItems: Array<VehicleItem> = [];

    const allVehicleItems = await this.vehicleItemRepo.find({
      where: { vehicle },
    });
    for (let i = 0; i < payload.items.length; i++) {
      const element = payload.items[i];

      const vehicleItem = new VehicleItem();
      const item = await this.itemMasterRepo.findOneBy({
        id: element[0],
      });
      if (!item) continue;
      if (item.useQty) {
        vehicleItem.quantity = element[1];
      }
      vehicleItem.vehicle = vehicle;
      vehicleItem.item = item;
      vehicleItems.push(vehicleItem);
    }
    await this.vehicleItemRepo.remove(allVehicleItems);
    await this.vehicleItemRepo.save(vehicleItems);
    return this.vehicleItemRepo.find({ where: { vehicle } });
  }
}
