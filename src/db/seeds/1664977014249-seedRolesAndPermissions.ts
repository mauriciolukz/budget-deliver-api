import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';
import { AppWindow } from 'src/users/entities/appWindow.entity';
import { Role } from 'src/users/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class seedRolesAndPermissions1664977014249
  implements MigrationInterface
{
  public async up(): Promise<void> {
    const appWindowRepo = dataSource.getRepository(AppWindow);
    const alquiler = await appWindowRepo.save({
      name: 'renting',
      caption: 'Alquiler del vehículo',
    });
    const entregaDomicilio = await appWindowRepo.save({
      name: 'delivery',
      caption: 'Entrega a domicilio',
    });
    const traslado = await appWindowRepo.save({
      name: 'transferring',
      caption: 'Traslado del vehículo',
    });
    const usoNoProductivo = await appWindowRepo.save({
      name: 'non_productive_use',
      caption: 'Uso no productivo',
    });

    const roleRepo = dataSource.getRepository(Role);
    const admin = await roleRepo.save({
      name: 'admin',
      roleType: 'app',
    });
    const informatica = await roleRepo.save({
      name: 'informatica',
      roleType: 'app',
    });
    const operaciones = await roleRepo.save({
      name: 'operaciones',
      roleType: 'app',
    });
    const flota = await roleRepo.save({ name: 'flota', roleType: 'app' });
    const taller = await roleRepo.save({ name: 'taller', roleType: 'app' });
    const recibidor = await roleRepo.save({
      name: 'recibidor',
      roleType: 'app',
    });
    const ejecutivo = await roleRepo.save({
      name: 'ejecutivo',
      roleType: 'app',
    });
    const hicker = await roleRepo.save({ name: 'hicker', roleType: 'app' });

    informatica.appWindows = [
      alquiler,
      traslado,
      usoNoProductivo,
      entregaDomicilio,
    ];
    operaciones.appWindows = [
      alquiler,
      traslado,
      usoNoProductivo,
      entregaDomicilio,
    ];
    flota.appWindows = [alquiler, traslado, usoNoProductivo];
    taller.appWindows = [traslado, usoNoProductivo];
    recibidor.appWindows = [traslado, usoNoProductivo];
    ejecutivo.appWindows = [
      alquiler,
      traslado,
      usoNoProductivo,
      entregaDomicilio,
    ];
    hicker.appWindows = [alquiler, traslado, usoNoProductivo];
    admin.appWindows = [alquiler, traslado, usoNoProductivo, entregaDomicilio];

    await roleRepo.save(informatica);
    await roleRepo.save(operaciones);
    await roleRepo.save(flota);
    await roleRepo.save(taller);
    await roleRepo.save(recibidor);
    await roleRepo.save(ejecutivo);
    await roleRepo.save(hicker);
    await roleRepo.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE roleAppWindow`);
    await queryRunner.query(`TRUNCATE TABLE appWindow`);
    await queryRunner.query(`TRUNCATE TABLE role`);
  }
}
