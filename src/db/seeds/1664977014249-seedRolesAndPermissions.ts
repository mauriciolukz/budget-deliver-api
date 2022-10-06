import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';
import { AppWindow } from 'src/users/entities/appWindow.entity';
import { Role } from 'src/users/entities/role.entity';

export class seedRolesAndPermissions1664977014249
  implements MigrationInterface
{
  public async up(): Promise<void> {
    const appWindowRepo = dataSource.getRepository(AppWindow);
    const alquiler = await appWindowRepo.save({
      name: 'renting',
      caption: 'renta',
    });
    const traslado = await appWindowRepo.save({
      name: 'transfering',
      caption: 'traslado',
    });
    const usoNoProductivo = await appWindowRepo.save({
      name: 'non_productive_use',
      caption: 'uso no productivo',
    });

    const roleRepo = dataSource.getRepository(Role);
    const informatica = await roleRepo.save({
      name: 'Informatica',
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

    informatica.appWindows = [alquiler, traslado, usoNoProductivo];
    operaciones.appWindows = [alquiler, traslado, usoNoProductivo];
    flota.appWindows = [alquiler, traslado, usoNoProductivo];
    taller.appWindows = [traslado, usoNoProductivo];
    recibidor.appWindows = [traslado, usoNoProductivo];
    ejecutivo.appWindows = [alquiler, traslado, usoNoProductivo];
    hicker.appWindows = [alquiler, traslado, usoNoProductivo];

    await roleRepo.save(informatica);
    await roleRepo.save(operaciones);
    await roleRepo.save(flota);
    await roleRepo.save(taller);
    await roleRepo.save(recibidor);
    await roleRepo.save(ejecutivo);
    await roleRepo.save(hicker);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "role_app_window"`);
    await queryRunner.query(`TRUNCATE TABLE "role"`);
    await queryRunner.query(`TRUNCATE TABLE "app_window"`);
  }
}
