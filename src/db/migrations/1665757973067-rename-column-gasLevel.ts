import { MigrationInterface, QueryRunner } from "typeorm";

export class renameColumnGasLevel1665757973067 implements MigrationInterface {
    name = 'renameColumnGasLevel1665757973067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "BUDG.dbo.vehicle.gasLevel", "fuelLevel"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "DF_e5f13f8e0a1da99a7d1075cf283"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "DF_1678768bf2b12c484b3eaab0d5a" DEFAULT '' FOR "fuelLevel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "DF_1678768bf2b12c484b3eaab0d5a"`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "DF_e5f13f8e0a1da99a7d1075cf283" DEFAULT '' FOR "fuelLevel"`);
        await queryRunner.query(`EXEC sp_rename "BUDG.dbo.vehicle.fuelLevel", "gasLevel"`);
    }

}
