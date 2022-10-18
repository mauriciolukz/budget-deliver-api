import { MigrationInterface, QueryRunner } from 'typeorm';

export class addingRelVehiclePhotosModel1666029401941
  implements MigrationInterface
{
  name = 'addingRelVehiclePhotosModel1666029401941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehiclePhoto" ("id" int NOT NULL IDENTITY(1,1), "groupName" varchar(21) NOT NULL, "name" varchar(50) NOT NULL, "urlImage" varchar(255) NOT NULL, "vehicleId" int, CONSTRAINT "PK_c3d6ffb47a7d6308f9c51805999" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "group-name-idx" ON "vehiclePhoto" ("groupName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "vehiclePhoto" ADD CONSTRAINT "FK_4764469ce0d32b1fd4212a65b7e" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehiclePhoto" DROP CONSTRAINT "FK_4764469ce0d32b1fd4212a65b7e"`,
    );
    await queryRunner.query(`DROP INDEX "group-name-idx" ON "vehiclePhoto"`);
    await queryRunner.query(`DROP TABLE "vehiclePhoto"`);
  }
}
