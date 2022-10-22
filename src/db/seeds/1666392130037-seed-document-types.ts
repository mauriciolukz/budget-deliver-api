import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';

export class seedDocumentTypes1666392130037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO documentConfig (documentType, abrev, nextNumber) values(1,'ALQ','000001') `,
    );

    await queryRunner.query(
      `INSERT INTO documentConfig (documentType, abrev, nextNumber) values(2,'TRF','000001') `,
    );

    await queryRunner.query(
      `INSERT INTO documentConfig (documentType, abrev, nextNumber) values(3,'UNP','000001') `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE documentType`);
  }
}
