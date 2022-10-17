import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUseQtyItemMaster1665965621353 implements MigrationInterface {
  name = 'addUseQtyItemMaster1665965621353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itemMaster" ADD "useQty" bit NOT NULL CONSTRAINT "DF_192a05fdc130e0708a852132119" DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itemMaster" DROP CONSTRAINT "DF_192a05fdc130e0708a852132119"`,
    );
    await queryRunner.query(`ALTER TABLE "itemMaster" DROP COLUMN "useQty"`);
  }
}
