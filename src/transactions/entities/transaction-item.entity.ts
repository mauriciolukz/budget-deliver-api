import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactionItem' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Campo Tipo documento obligatorio' })
  @Column({ type: 'smallint' })
  documentType: number;

  @IsNotEmpty({ message: 'Campo Núm. de documento obligatorio' })
  @Column({ type: 'varchar', length: 15 })
  documentNumber: string;

  @Column({ type: 'varchar', length: 100 })
  itemDescription: string;

  @Column({ type: 'smallint' })
  quantity: number;

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
