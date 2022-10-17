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
    const { limit, offset } = params;
    const [vehicles, records] = await this.vehicleRepo.findAndCount({
      take: limit,
      skip: offset,
    });
    return { records, vehicles };
  }

  findById(id: number) {
    return this.vehicleRepo.findOneBy({ id });
  }

  findByMVA(MVA: string) {
    return this.vehicleRepo.findOne({
      where: { MVA },
      relations: { items: { item: true } },
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
