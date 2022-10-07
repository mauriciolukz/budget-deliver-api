import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity({ name: 'appWindow' })
export class AppWindow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  caption: string;

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

  @ManyToMany(() => Role, (role) => role.appWindows)
  @JoinTable({ name: 'roleAppWindow' })
  roles: Role[];
}
