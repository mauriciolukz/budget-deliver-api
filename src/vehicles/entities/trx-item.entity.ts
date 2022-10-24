import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrxCheck } from '../enums/trx-check';

@Entity({ name: 'transactionItem' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Campo Tipo documento obligatorio' })
  @Column({ type: 'smallint' })
  trxType: number;

  @IsNotEmpty({ message: 'Campo Núm. de documento obligatorio' })
  @Column({ type: 'varchar', length: 15 })
  trxNumber: string;

  @Column({ type: 'smallint' })
  itemId: number;

  @Column({ type: 'smallint' })
  quantity: number;

  @Column({ type: 'varchar', length: 3 })
  check: TrxCheck;

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
