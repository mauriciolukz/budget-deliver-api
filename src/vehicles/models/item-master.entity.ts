import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { ItemType } from '../types/item-type';

@Entity()
export class ItemMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('desc-idx')
  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'smallint' })
  itemType: ItemType;

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
}
