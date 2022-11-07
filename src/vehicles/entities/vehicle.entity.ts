import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { FuelLevel } from '../enums/fuel-level';
import { VehicleItem } from './vehicle-item.entity';
import { ItemType } from '../enums/item-type';
import { VehiclePhoto } from './vehicle-photo.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('mva-idx')
  @Column({ type: 'varchar', length: 30 })
  MVA: string;

  @Column({ type: 'varchar', length: 30 })
  make: string;

  @Column({ type: 'varchar', length: 30 })
  model: string;

  @Column({ type: 'varchar', length: 30 })
  color: string;

  @Column({ type: 'varchar', length: 30 })
  plateNum: string;

  @Column({ type: 'varchar', length: 30 })
  keyNum: string;

  @Column({ type: 'integer', default: 0 })
  currentKm: number;

  @Column({ type: 'varchar', length: 3, default: '' })
  fuelLevel: FuelLevel;

  @Column({ type: 'varchar', length: 255, default: '' })
  remark: string;

  @Column({ type: 'datetime', nullable: true })
  lastOilChangeDate: Date;

  @Column({ type: 'datetime', nullable: true })
  nextOilChangeDate: Date;

  @Column({ type: 'integer', nullable: true })
  nextOilChangeKm: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  location: string;

  @Column({ type: 'bit', default: true })
  isAvailable: boolean;

  @Column({ type: 'varchar', length: 15, default: '' })
  lastTrxNumber: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  lastTrxAbrev: string;

  @Exclude()
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Exclude()
  @OneToMany(() => VehicleItem, (vehicleItem) => vehicleItem.vehicle)
  items: VehicleItem[];

  @OneToMany(() => VehiclePhoto, (vehiclePhoto) => vehiclePhoto.vehicle)
  @JoinColumn()
  photos: VehiclePhoto[];

  @Expose()
  get _items() {
    if (this.items) {
      return this.items.map((item) => ({
        description: item.item.description,
        itemType: ItemType[item.item.itemType],
        quantity: item.quantity,
        useQty: item.item.useQty,
      }));
    }
    return [];
  }
}
