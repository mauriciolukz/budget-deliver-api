import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'openTransaction' })
export class OpenTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Campo Tipo documento obligatorio' })
  @Column({ type: 'smallint' })
  documentType: number;

  @IsNotEmpty({ message: 'Campo Núm. de documento obligatorio' })
  @Column({ type: 'varchar', length: 15 })
  documentNumber: string;

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

  @IsNotEmpty({ message: 'Campo locación obligatorio' })
  @Column({ type: 'varchar', length: 60 })
  locationName: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

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
