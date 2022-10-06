import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findByUsername(username: string) {
    return this.usersRepo.findOneBy({ username });
  }

  async create(data: CreateUserDto) {
    const newUser = this.usersRepo.create(data);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.usersRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario no existe`);
    this.usersRepo.merge(user, changes);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    // const user = await this.usersRepo.findOneBy({ id });
    // if (!user) throw new NotFoundException(`Usuario no existe`);
    return this.usersRepo.delete(id);
  }

  findRol(name: string) {
    return this.roleRepo.findOne({
      where: { name },
      relations: { appWindows: true },
    });
  }
}
