import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactionConfig' })
export class TransactionConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  trxType: number;

  @Column({ type: 'varchar', length: 10 })
  abrev: string;

  @Column({ type: 'varchar', length: 15 })
  nextNumber: string;

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
