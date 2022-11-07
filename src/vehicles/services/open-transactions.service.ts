import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenTransaction } from '../entities/open-trx.entity';
import { sumOne } from 'src/utils/sum-one';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../dtos/open-trx.dto';
import { DataSource } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { TransactionConfig } from '../entities/trx-config.entity';
import { TrxWheel } from '../entities/trx-wheel.entity';
import { CreateTrxWheelDto } from '../dtos/trx-wheel.dto';
import { TrxCheck } from '../enums/trx-check';
import { LocationsService } from 'src/locations/services/locations.service';
import { TrxType } from '../enums/trx-type';

@Injectable()
export class OpenTransactionsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(OpenTransaction)
    private openTransRepo: Repository<OpenTransaction>,
    @InjectRepository(TrxWheel) private wheel: Repository<TrxWheel>,
    private locationsService: LocationsService,
  ) {}

  find(id: number) {
    return this.openTransRepo.findOneBy({ id });
  }

  findAll() {
    return this.openTransRepo.find();
  }

  async create(
    { vehicleId, trxType, check, toLocation }: CreateTransactionDto,
    username: string,
  ) {
    const openTrx = await this.openTransRepo.findOneBy({ id: vehicleId });
    return this.dataSource.transaction<OpenTransaction>(
      'SERIALIZABLE',
      async (manager) => {
        const vehicle = await manager.findOneBy(Vehicle, { id: vehicleId });
        if (!vehicle)
          throw new NotFoundException('Registo de vehículo no encontrado');
        if (!vehicle.isAvailable && check === TrxCheck.Out)
          throw new ConflictException(
            `El vehículo ${vehicle.MVA} no está disponible`,
          );
        if (vehicle.isAvailable && check === TrxCheck.In)
          throw new ConflictException(
            `El vehículo ${vehicle.MVA} no está disponible para check-in`,
          );
        if (openTrx && openTrx.trxType !== trxType && check === TrxCheck.In)
          throw new ConflictException(
            `El vehículo ${vehicle.MVA} no puede ingresarse con este tipo de documento`,
          );
        if (vehicle.location.length === 0)
          throw new UnprocessableEntityException(
            'Vehiculo no tiene locación definida',
          );

        if (trxType == TrxType.transferencia) {
          if (toLocation === vehicle.location)
            throw new ConflictException(
              'Locación destino no puede ser la misma de origen',
            );
          const location = await this.locationsService.findOneByName(
            toLocation,
          );

          if (!location)
            throw new NotFoundException(`No se encontró locación destino`);
        }

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
          currentKm: vehicle.currentKm,
          trxKm: vehicle.currentKm,
          fuelLevel: vehicle.fuelLevel,
          trxType: trxConfig.trxType,
          abrev: trxConfig.abrev,
          trxNumber: trxConfig.nextNumber,
          trxLocation: vehicle.location,
          toLocation,
          check,
          username,
        });

        const ct1 = await manager.update(TransactionConfig, trxConfig.id, {
          nextNumber,
        });
        const ct2 = await manager.update(Vehicle, vehicle.id, {
          isAvailable: false,
          lastTrxAbrev: openTran.abrev,
          lastTrxNumber: openTran.trxNumber,
        });

        if (ct1.affected + ct2.affected !== 2)
          throw new UnprocessableEntityException(
            'Una o mas entidades no fueron actualizadas',
          );

        await manager.save(openTran);

        return openTran;
      },
    );
  }

  async update(id: number, payload: UpdateTransactionDto) {
    const openTran = await this.openTransRepo.findOneBy({ id });
    if (payload.trxKm < openTran.currentKm)
      throw new UnprocessableEntityException(
        `El km de la transacción no puede ser menor a ${openTran.currentKm}`,
      );
    this.openTransRepo.merge(openTran, payload);
    return this.openTransRepo.save(openTran);
  }

  findByVehicleId(vehicleId: number) {
    return this.openTransRepo.findOneBy({ vehicleId });
  }

  async createWheel(id: number, payload: CreateTrxWheelDto) {
    const openTrx = await this.openTransRepo.findOneBy({ id });
    if (!openTrx) throw new NotFoundException();

    const cntWheels = await this.wheel.count({
      where: { trxNumber: openTrx.trxNumber, trxType: openTrx.trxType },
    });

    if (cntWheels >= 5)
      throw new UnprocessableEntityException(
        'Registro de llantas no puede exceder los 5 registros',
      );

    const cntSpareWheels = await this.wheel.count({
      where: {
        trxNumber: openTrx.trxNumber,
        trxType: openTrx.trxType,
        spare: true,
      },
    });

    if (cntSpareWheels >= 1)
      throw new UnprocessableEntityException(
        'Llanta de repuesto ya está registrada',
      );

    const cntNonSpareWheels = await this.wheel.count({
      where: {
        trxNumber: openTrx.trxNumber,
        trxType: openTrx.trxType,
        spare: false,
      },
    });

    if (cntNonSpareWheels >= 4 && !payload.spare)
      throw new UnprocessableEntityException(
        'No ha registrado llanta de repuesto',
      );

    const trxWheel = await this.wheel.create({
      trxType: openTrx.trxType,
      trxNumber: openTrx.trxNumber,
      spare: payload.spare,
      tyrePressureLevel: payload.tyrePressureLevel,
      tyreUsefulLife: payload.tyreUsefulLife,
      tyreUsfLifeRemark: payload.tyreUsfLifeRemark,
      tyreMarkCondition: payload.tyreMarkCondition,
      rimType: payload.rimType,
      rimPainting: payload.rimPainting,
      rimMarkCondition: payload.rimMarkCondition,
      check: openTrx.check,
    });

    return this.wheel.save(trxWheel);
  }

  async deleteWheels(id: number) {
    const openTrx = await this.openTransRepo.findOneBy({ id });
    if (!openTrx) throw new NotFoundException();

    return this.wheel.delete({
      trxType: openTrx.trxType,
      trxNumber: openTrx.trxNumber,
    });
  }

  async findAllWheels(id: number) {
    const openTrx = await this.openTransRepo.findOneBy({ id });
    if (!openTrx) throw new NotFoundException();

    return this.wheel.findBy({
      trxType: openTrx.trxType,
      trxNumber: openTrx.trxNumber,
    });
  }
}
