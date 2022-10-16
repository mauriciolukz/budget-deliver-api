import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto, UpdateDriverDto } from '../dtos/driver.dto';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private driversRepo: Repository<Driver>,
  ) {}

  findAll() {
    return this.driversRepo.find();
  }

  async create(data: CreateDriverDto) {
    return this.driversRepo.save(data);
  }

  async update(id: number, changes: UpdateDriverDto) {
    const driver = await this.driversRepo.findOneBy({ id });
    if (!driver) throw new NotFoundException();
    this.driversRepo.merge(driver, changes);
    return this.driversRepo.save(driver);
  }

  async remove(id: number) {
    return this.driversRepo.delete(id);
  }
}
