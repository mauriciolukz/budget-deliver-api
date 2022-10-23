import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenTransaction } from '../entities/open-trx.entity';
import { sumOne } from 'src/utils/sum-one';
import { CreateTransactionDto, UpdateTransactionDto } from '../dtos/open-trx';
import { DataSource } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { TransactionConfig } from '../entities/trx-config.entity';

@Injectable()
export class OpenTransactionsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(OpenTransaction)
    private openTransRepo: Repository<OpenTransaction>,
  ) {}

  findAll() {
    return this.openTransRepo.find();
  }

  async create({ vehicleId, trxType }: CreateTransactionDto, username: string) {
    return this.dataSource.transaction<OpenTransaction>(
      'SERIALIZABLE',
      async (manager) => {
        const vehicle = await manager.findOneBy(Vehicle, { id: vehicleId });
        if (!vehicle)
          throw new NotFoundException('Registo de vehículo no encontrado');

        if (!vehicle.isAvailable)
          throw new ConflictException(
            `El vehículo ${vehicle.MVA} no está disponible`,
          );

        const trxConfig = await manager.findOneBy(TransactionConfig, {
          trxType,
        });
        if (!trxConfig)
          throw new NotFoundException('Registro de documento no encontrado');

        const nextNumber = await sumOne(trxConfig.nextNumber);

        const openTran = manager.create(OpenTransaction, {
          vehicleId: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          km: vehicle.currentKm,
          fuelLevel: vehicle.fuelLevel,
          trxType: trxConfig.trxType,
          abrev: trxConfig.abrev,
          trxNumber: trxConfig.nextNumber,
          locationName: vehicle.location,
          username,
        });

        await manager.update(TransactionConfig, trxConfig.id, { nextNumber });
        await manager.update(Vehicle, vehicle.id, { isAvailable: false });
        await manager.save(openTran);
        return openTran;
      },
    );
  }

  async update(id: number, payload: UpdateTransactionDto) {
    const openTran = await this.openTransRepo.findOneBy({ id });
    this.openTransRepo.merge(openTran, payload);
    return this.openTransRepo.save(openTran);
  }

  findByVehicleId(vehicleId: number) {
    return this.openTransRepo.findOneBy({ vehicleId });
  }
}
