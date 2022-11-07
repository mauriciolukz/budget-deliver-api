import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto, UpdateLocationDto } from '../dtos/location.dto';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationsRepo: Repository<Location>,
  ) {}

  findAll() {
    return this.locationsRepo.find();
  }
  findOne(id: number) {
    return this.locationsRepo.findOneBy({ id });
  }

  findOneByName(locationName: string) {
    return this.locationsRepo.findOneBy({ locationName });
  }

  async create(data: CreateLocationDto) {
    return this.locationsRepo.save(data);
  }

  async update(id: number, changes: UpdateLocationDto) {
    const location = await this.locationsRepo.findOneBy({ id });
    if (!location) throw new NotFoundException(`Registro no existe`);
    this.locationsRepo.merge(location, changes);
    return this.locationsRepo.save(location);
  }

  async remove(id: number) {
    // const user = await this.usersRepo.findOneBy({ id });
    // if (!user) throw new NotFoundException(`Usuario no existe`);
    return this.locationsRepo.delete(id);
  }
}
