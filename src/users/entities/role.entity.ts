import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Unique,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AppWindow } from './appWindow.entity';
import { RoleType } from '../types/roleType';

@Entity()
@Unique(['name', 'roleType'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 3 })
  roleType: RoleType;

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

  @ManyToMany(() => AppWindow, (appWindow) => appWindow.roles)
  appWindows: AppWindow[];
}
