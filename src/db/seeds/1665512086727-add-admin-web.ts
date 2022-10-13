import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminWeb1665512086727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "role" set roleType = 'app'`);
    await queryRunner.query(
      `insert into role (name, roleType) values ('admin','web')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
