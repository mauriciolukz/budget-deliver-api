import { MigrationInterface, QueryRunner } from "typeorm";

export class createItemsMasterAndDriversTbls1665941918635 implements MigrationInterface {
    name = 'createItemsMasterAndDriversTbls1665941918635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" int NOT NULL IDENTITY(1,1), "firstName" varchar(50) NOT NULL, "middleName" varchar(50) NOT NULL, "lastName" varchar(50) NOT NULL, "phone1" varchar(30) NOT NULL, "phone2" varchar(30) NOT NULL CONSTRAINT "DF_2cc9cbaff016a2cb0ebbba2449a" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_aa47e46c36d965a5ae0e7f75775" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_058ea7a6f99dc34009a49509e3b" DEFAULT getdate(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_master" ("id" int NOT NULL IDENTITY(1,1), "description" varchar(100) NOT NULL, "itemType" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_514a3134b62c641b2b26aed5a60" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_838c879edb521399bf1109901e4" DEFAULT getdate(), CONSTRAINT "PK_081e88235eb8474f36c674d9737" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "desc-idx" ON "item_master" ("description") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "desc-idx" ON "item_master"`);
        await queryRunner.query(`DROP TABLE "item_master"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
