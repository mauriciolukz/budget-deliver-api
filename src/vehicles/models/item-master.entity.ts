import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { ItemType } from '../types/item-type';

@Entity({ name: 'itemMaster' })
export class ItemMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('desc-idx')
  @Column({ type: 'varchar', length: 100, unique: true })
  description: string;

  @Column({ type: 'smallint' })
  itemType: ItemType;

  @Column({ type: 'bit', default: false })
  useQty: boolean;

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

  @Expose()
  get itemTypeDesc() {
    return ItemType[this.itemType];
  }
}
