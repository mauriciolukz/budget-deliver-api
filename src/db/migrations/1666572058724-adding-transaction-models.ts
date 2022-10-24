import { MigrationInterface, QueryRunner } from "typeorm";

export class addingTransactionModels1666572058724 implements MigrationInterface {
    name = 'addingTransactionModels1666572058724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactionConfig" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "abrev" varchar(10) NOT NULL, "nextNumber" varchar(15) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_49264857ebea8f1cea21624e1bb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d8c52fb0368149e7ac808bba9bf" DEFAULT getdate(), CONSTRAINT "PK_615e11f83697965c91a4acd6716" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "openTransaction" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "abrev" varchar(10) NOT NULL, "trxNumber" varchar(15) NOT NULL, "vehicleId" smallint NOT NULL, "make" varchar(30) NOT NULL, "model" varchar(30) NOT NULL, "color" varchar(30) NOT NULL, "km" int NOT NULL, "fuelLevel" varchar(3) NOT NULL CONSTRAINT "DF_eff9d5495aa298c0881892fff8f" DEFAULT '', "locationName" varchar(60) NOT NULL, "username" varchar(30) NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_0c40dc9b4e909f78efbbef1266d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_65f19c5cc4a599000618e6babd3" DEFAULT getdate(), CONSTRAINT "UQ_4d1085e3dc34e60aa7e1bea474e" UNIQUE ("vehicleId", "check"), CONSTRAINT "UQ_9fbb3f11b5206e0e47963d51fcc" UNIQUE ("trxType", "trxNumber"), CONSTRAINT "PK_679d2864cbc49f5ee190b9aa921" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactionWheel" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "trxNumber" varchar(10) NOT NULL, "spare" smallint NOT NULL CONSTRAINT "DF_5e84bada9469edb351ceb059eba" DEFAULT 0, "tyrePressureLevel" smallint NOT NULL, "tyreUsefulLife" smallint NOT NULL, "tyreUsfLifeRemark" varchar(255) NOT NULL CONSTRAINT "DF_157af89523ce52d2b08047ac2ae" DEFAULT '', "tyreMarkCondition" varchar(15) NOT NULL, "rimType" varchar(15) NOT NULL, "rimPainting" varchar(15) NOT NULL, "rimMarkCondition" varchar(15) NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_0aa510e431114f8fe40ac60bc9a" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_bec33dba4cd0431e53e0f8b353e" DEFAULT getdate(), CONSTRAINT "PK_e222b8208b65d052550f0b5043a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactionItem" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "trxNumber" varchar(15) NOT NULL, "itemId" smallint NOT NULL, "quantity" smallint NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_a70c45799c5916a8ac7b1fc45fe" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_ceaf3e2958ae94e1ae7e3fce36a" DEFAULT getdate(), CONSTRAINT "PK_b36898b318e7f9391e76ab897eb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactionItem"`);
        await queryRunner.query(`DROP TABLE "transactionWheel"`);
        await queryRunner.query(`DROP TABLE "openTransaction"`);
        await queryRunner.query(`DROP TABLE "transactionConfig"`);
    }

}
