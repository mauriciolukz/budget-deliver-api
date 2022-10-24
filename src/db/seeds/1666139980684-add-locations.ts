import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLocations1666139980684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO location(locationName, address, phone1) values('Super Mercado La Union','Villa Fontana Pista Suburabana','(505) 2255-9003') `,
    );
    await queryRunner.query(
      `INSERT INTO location(locationName, address, phone1) values('Augusto C Sandino Intl Airport','Km 11 Carretera Norte','(505) 2263-1222/1068') `,
    );
    await queryRunner.query(
      `INSERT INTO location(locationName, address, phone1) values('Holiday Inn Convention Center','Pista Juan Pablo Ii','(505) 2255-9002') `,
    );
    await queryRunner.query(
      `INSERT INTO location(locationName, address, phone1) values('Managua Downtown','Pista Juan Pablo Ii','(505) 2255-9001') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`TRUNCATE TABLE location`);
  }
}
