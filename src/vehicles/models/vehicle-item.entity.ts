import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Vehicle } from './vehicle.entity';
import { ItemMaster } from './item-master.entity';

@Entity({ name: 'vehicleItem' })
@Unique('vehicleId-itemId', ['vehicle', 'item'])
export class VehicleItem {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Vehicle, (Vehicle) => Vehicle.items)
  vehicle: Vehicle;

  @ManyToOne(() => ItemMaster)
  item: ItemMaster;

  @Column({ type: 'smallint', default: 0 })
  quantity: number;
}
