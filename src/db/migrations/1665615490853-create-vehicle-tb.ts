import { MigrationInterface, QueryRunner } from "typeorm";

export class createVehicleTb1665615490853 implements MigrationInterface {
    name = 'createVehicleTb1665615490853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" int NOT NULL IDENTITY(1,1), "MVA" varchar(30) NOT NULL, "make" varchar(30) NOT NULL, "model" varchar(30) NOT NULL, "color" varchar(30) NOT NULL, "plateNum" varchar(30) NOT NULL, "keyNum" varchar(30) NOT NULL, "currentKm" int NOT NULL CONSTRAINT "DF_3dc6d6c6dd10315f055412e3a8d" DEFAULT 0, "gasLevel" varchar(3) NOT NULL CONSTRAINT "DF_e5f13f8e0a1da99a7d1075cf283" DEFAULT '', "remark" varchar(255) NOT NULL CONSTRAINT "DF_2a6b61ad37886eac0d4d427804a" DEFAULT '', "lastOilChangeDate" datetime, "nextOilChangeDate" datetime, "nextOilChangeKm" int, "location" varchar(50) NOT NULL CONSTRAINT "DF_d73e3d67dc6c76c049f754af41f" DEFAULT '', "isAvailable" bit NOT NULL CONSTRAINT "DF_d713fd55d35b4b94a2f35560d74" DEFAULT 1, "createdAt" datetime NOT NULL CONSTRAINT "DF_79d54819538d79f47d5ef5a154d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_03f27141dc4d4bb5e3079214bd7" DEFAULT getdate(), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "roleType" varchar(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9" UNIQUE ("name", "roleType")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "roleType" varchar(3)`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9" UNIQUE ("name", "roleType")`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
