import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ type: 'varchar', length: 255 })
  refreshToken: string;

  @Column({ type: 'datetime' })
  loginDate: Date;

  @Column({ type: 'datetime' })
  tokenExpiration: Date;

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
