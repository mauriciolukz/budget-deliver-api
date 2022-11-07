import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { FuelLevel } from '../enums/fuel-level';
import { TrxCheck } from '../enums/trx-check';

@Unique(['trxType', 'trxNumber'])
@Unique(['vehicleId', 'check'])
@Entity({ name: 'openTransaction' })
export class OpenTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Campo Tipo documento obligatorio' })
  @Column({ type: 'smallint' })
  trxType: number;

  @IsNotEmpty({ message: 'Campo Abreviatura obligatorio' })
  @Column({ type: 'varchar', length: 10 })
  abrev: string;

  @IsNotEmpty({ message: 'Campo Núm. de documento obligatorio' })
  @Column({ type: 'varchar', length: 15 })
  trxNumber: string;

  @IsNotEmpty({ message: 'Campo Id. de vehículo obligatorio' })
  @Column({ type: 'smallint' })
  vehicleId: number;

  @IsNotEmpty({ message: 'Campo Marca obligatorio' })
  @Column({ type: 'varchar', length: 30 })
  make: string;

  @IsNotEmpty({ message: 'Campo Modelo obligatorio' })
  @Column({ type: 'varchar', length: 30 })
  model: string;

  @IsNotEmpty({ message: 'Campo Color obligatorio' })
  @Column({ type: 'varchar', length: 30 })
  color: string;

  @Column({ type: 'integer' })
  currentKm: number;

  @Column({ type: 'integer' })
  trxKm: number;

  @Column({ type: 'varchar', length: 3, default: '' })
  fuelLevel: FuelLevel;

  @IsNotEmpty({ message: 'Campo locación obligatorio' })
  @Column({ type: 'varchar', length: 60 })
  trxLocation: string;

  @Column({ type: 'varchar', length: 60, default: '' })
  toLocation: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @IsNotEmpty({ message: 'Campo Revisión obligatorio' })
  @Column({ type: 'varchar', length: 3 })
  check: TrxCheck;

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
