import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateVehicleDto,
  FilterVehiclesDto,
  UpdateVehicleDto,
} from '../dtos/vehicle.dto';
import { Vehicle } from '../models/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
  ) {}

  async findAll(params: FilterVehiclesDto) {
    const { limit = null, offset = null } = params;
    return this.vehicleRepo.find({
      take: limit,
      skip: offset,
    });
  }

  async findOneByMVA(MVA: string) {
    return this.vehicleRepo.findOne({
      where: { MVA },
    });
  }

  create(data: CreateVehicleDto) {
    return this.vehicleRepo.save(data);
  }

  async update(id: number, payload: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepo.findOneBy({ id });
    if (!vehicle) throw new NotFoundException('Registro no encontrado');
    this.vehicleRepo.merge(vehicle, payload);
    return this.vehicleRepo.save(vehicle);
  }

  async delete(id: number) {
    return this.vehicleRepo.delete(id);
  }
}
