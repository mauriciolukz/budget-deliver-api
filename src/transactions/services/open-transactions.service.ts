import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
import { Repository, getConnection } from 'typeorm';
import { OpenTransaction } from '../entities/open-transaction.entity';
import { DocumentConfigsService } from './document-types.service';
import { sumOne } from 'src/utils/sum-one';
import { CreateOpenTransactionDto } from '../dtos/open-transaction.dto';
import { dataSource } from 'src/db/dataSource';

@Injectable()
export class OpenTransactionsService {
  constructor(
    @InjectRepository(OpenTransaction)
    private openTransRepo: Repository<OpenTransaction>,
    private documentConfigsService: DocumentConfigsService,
    private vehiclesService: VehiclesService,
  ) {}

  async create(
    { vehicleId, documentType }: CreateOpenTransactionDto,
    username: string,
  ) {
    const vehicle = await this.vehiclesService.findById(vehicleId);
    if (!vehicle)
      throw new NotFoundException('Registo de vehículo no encontrado');
    const document = await this.documentConfigsService.getByType(documentType);
    if (!document)
      throw new NotFoundException('Registro de documento no encontrado');

    const openTran = await this.openTransRepo.create({
      vehicleId: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      documentType: document.documentType,
      documentNumber: document.nextNumber,
      locationName: vehicle.location,
      username,
    });

    document.nextNumber = await sumOne(document.nextNumber);
    vehicle.isAvailable = false;

    await this.documentConfigsService.update(document.id, document);
    await this.vehiclesService.update(vehicle.id, vehicle);
    return this.openTransRepo.save(openTran);
  }
}
