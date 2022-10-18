import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'vehiclePhoto' })
export class VehiclePhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('group-name-idx')
  @Column({ type: 'varchar', length: 21 })
  groupName: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  urlImage: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.photos)
  vehicle: Vehicle;
}
