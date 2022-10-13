import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { GasLevel } from '../types/gasLevel';

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
  gasLevel: GasLevel;

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
