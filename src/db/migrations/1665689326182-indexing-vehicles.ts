import { MigrationInterface, QueryRunner } from "typeorm";

export class indexingVehicles1665689326182 implements MigrationInterface {
    name = 'indexingVehicles1665689326182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "mva-idx" ON "vehicle" ("MVA") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "mva-idx" ON "vehicle"`);
    }

}
