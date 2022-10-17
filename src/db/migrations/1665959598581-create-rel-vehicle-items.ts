import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelVehicleItems1665959598581 implements MigrationInterface {
    name = 'createRelVehicleItems1665959598581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicleItem" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime NOT NULL CONSTRAINT "DF_ee2e05b19e434e3f751f43fcce3" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b3d7f25f2665999d9782d65a2e4" DEFAULT getdate(), "quantity" smallint NOT NULL, "vehicleId" int, "itemId" int, CONSTRAINT "vehicleId-itemId" UNIQUE ("vehicleId", "itemId"), CONSTRAINT "PK_4b709ce0fde3c56c5977a60a174" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicleItem" ADD CONSTRAINT "FK_166e354d7c4ee07721531fcf86a" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicleItem" ADD CONSTRAINT "FK_4a5693492d3d5e35018b5590b89" FOREIGN KEY ("itemId") REFERENCES "itemMaster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicleItem" DROP CONSTRAINT "FK_4a5693492d3d5e35018b5590b89"`);
        await queryRunner.query(`ALTER TABLE "vehicleItem" DROP CONSTRAINT "FK_166e354d7c4ee07721531fcf86a"`);
        await queryRunner.query(`DROP TABLE "vehicleItem"`);
    }

}
