import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';
import { AppWindow } from 'src/users/entities/appWindow.entity';
import { Role } from 'src/users/entities/role.entity';
import { RoleType } from 'src/users/types/roleType';

export class seedRolesAndPermissions1664977014249
  implements MigrationInterface
{
  public async up(): Promise<void> {
    const appWindowRepo = dataSource.getRepository(AppWindow);
    const alquiler = await appWindowRepo.save({
      name: 'renting',
      caption: 'Alquiler del vehículo',
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
      roleType: RoleType.app,
    });
    const adminWeb = await roleRepo.save({
      name: 'admin',
      roleType: RoleType.web,
    });
    const informatica = await roleRepo.save({
      name: 'informatica',
      roleType: RoleType.app,
    });
    const operaciones = await roleRepo.save({
      name: 'operaciones',
      roleType: RoleType.app,
    });
    const flota = await roleRepo.save({
      name: 'flota',
      roleType: RoleType.app,
    });
    const taller = await roleRepo.save({
      name: 'taller',
      roleType: RoleType.app,
    });
    const recibidor = await roleRepo.save({
      name: 'recibidor',
      roleType: RoleType.app,
    });
    const ejecutivo = await roleRepo.save({
      name: 'ejecutivo',
      roleType: RoleType.app,
    });
    const hicker = await roleRepo.save({
      name: 'hicker',
      roleType: RoleType.app,
    });

    informatica.appWindows = [alquiler, traslado, usoNoProductivo];
    operaciones.appWindows = [alquiler, traslado, usoNoProductivo];
    flota.appWindows = [alquiler, traslado, usoNoProductivo];
    taller.appWindows = [traslado, usoNoProductivo];
    recibidor.appWindows = [traslado, usoNoProductivo];
    ejecutivo.appWindows = [alquiler, traslado, usoNoProductivo];
    hicker.appWindows = [alquiler, traslado, usoNoProductivo];
    admin.appWindows = [alquiler, traslado, usoNoProductivo];

    await roleRepo.save(informatica);
    await roleRepo.save(operaciones);
    await roleRepo.save(flota);
    await roleRepo.save(taller);
    await roleRepo.save(recibidor);
    await roleRepo.save(ejecutivo);
    await roleRepo.save(hicker);
    await roleRepo.save(admin);
    await roleRepo.save(adminWeb);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE roleAppWindow`);
    await queryRunner.query(`TRUNCATE TABLE appWindow`);
    await queryRunner.query(`TRUNCATE TABLE role`);
  }
}
