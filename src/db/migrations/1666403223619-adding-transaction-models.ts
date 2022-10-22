import { MigrationInterface, QueryRunner } from "typeorm";

export class addingTransactionModels1666403223619 implements MigrationInterface {
    name = 'addingTransactionModels1666403223619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documentConfig" ("id" int NOT NULL IDENTITY(1,1), "documentType" smallint NOT NULL, "abrev" varchar(10) NOT NULL, "nextNumber" varchar(15) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_c16568170f2820cb9a82408fd03" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b83280b1dc3f6f48065a5b7a747" DEFAULT getdate(), CONSTRAINT "PK_1633b965473d951859757bb33c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactionItem" ("id" int NOT NULL IDENTITY(1,1), "documentType" smallint NOT NULL, "documentNumber" varchar(15) NOT NULL, "itemDescription" varchar(100) NOT NULL, "quantity" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_a70c45799c5916a8ac7b1fc45fe" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_ceaf3e2958ae94e1ae7e3fce36a" DEFAULT getdate(), CONSTRAINT "PK_b36898b318e7f9391e76ab897eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "openTransaction" ("id" int NOT NULL IDENTITY(1,1), "documentType" smallint NOT NULL, "documentNumber" varchar(15) NOT NULL, "vehicleId" smallint NOT NULL, "make" varchar(30) NOT NULL, "model" varchar(30) NOT NULL, "color" varchar(30) NOT NULL, "locationName" varchar(60) NOT NULL, "username" varchar(30) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_0c40dc9b4e909f78efbbef1266d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_65f19c5cc4a599000618e6babd3" DEFAULT getdate(), CONSTRAINT "PK_679d2864cbc49f5ee190b9aa921" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "openTransaction"`);
        await queryRunner.query(`DROP TABLE "transactionItem"`);
        await queryRunner.query(`DROP TABLE "documentConfig"`);
    }

}
