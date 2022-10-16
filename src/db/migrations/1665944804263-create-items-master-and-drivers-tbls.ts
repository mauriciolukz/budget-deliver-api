import { MigrationInterface, QueryRunner } from "typeorm";

export class createItemsMasterAndDriversTbls1665944804263 implements MigrationInterface {
    name = 'createItemsMasterAndDriversTbls1665944804263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" int NOT NULL IDENTITY(1,1), "firstName" varchar(50) NOT NULL, "middleName" varchar(50) NOT NULL, "lastName" varchar(50) NOT NULL, "phone1" varchar(30) NOT NULL, "phone2" varchar(30) NOT NULL CONSTRAINT "DF_2cc9cbaff016a2cb0ebbba2449a" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_aa47e46c36d965a5ae0e7f75775" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_058ea7a6f99dc34009a49509e3b" DEFAULT getdate(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "itemMaster" ("id" int NOT NULL IDENTITY(1,1), "description" varchar(100) NOT NULL, "itemType" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_65848bddeb302a9b9038f32d479" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_a2c7f5a3c97b9b61c1ccdfba814" DEFAULT getdate(), CONSTRAINT "UQ_a00b54ed8ecabec62472c794bd7" UNIQUE ("description"), CONSTRAINT "PK_5aff43f41bfa220ce4bf516d369" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "desc-idx" ON "itemMaster" ("description") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "desc-idx" ON "itemMaster"`);
        await queryRunner.query(`DROP TABLE "itemMaster"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
