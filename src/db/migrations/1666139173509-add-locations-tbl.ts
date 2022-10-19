import { MigrationInterface, QueryRunner } from "typeorm";

export class addLocationsTbl1666139173509 implements MigrationInterface {
    name = 'addLocationsTbl1666139173509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime NOT NULL CONSTRAINT "DF_09dee1a3d42723079bd45577916" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b21f4d902db7cc1c5db2e86d3d1" DEFAULT getdate(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
