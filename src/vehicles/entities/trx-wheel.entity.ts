import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TrxCheck } from '../enums/trx-check';
import {
  RimMarkCondition,
  RimType,
  TyreMarkCondition,
} from '../enums/wheel-type';

@Entity({ name: 'transactionWheel' })
export class TrxWheel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  trxType: number;

  @Column({ type: 'varchar', length: 10 })
  trxNumber: string;

  @Column({ type: 'smallint', default: 0 })
  spare: boolean;

  @Column({ type: 'smallint' })
  tyrePressureLevel: number;

  @Column({ type: 'smallint' })
  tyreUsefulLife: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  tyreUsfLifeRemark: string;

  @Column({ type: 'varchar', length: 15 })
  tyreMarkCondition: TyreMarkCondition;

  @Column({ type: 'varchar', length: 15 })
  rimType: RimType;

  @Column({ type: 'varchar', length: 15 })
  rimPainting: string;

  @Column({ type: 'varchar', length: 15 })
  rimMarkCondition: RimMarkCondition;

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
