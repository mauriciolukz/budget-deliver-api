import { MigrationInterface, QueryRunner } from "typeorm";

export class roleUniquesIndex1665511948538 implements MigrationInterface {
    name = 'roleUniquesIndex1665511948538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleType"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "roleType" varchar(3) NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9" UNIQUE ("name", "roleType")`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleType"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "roleType" varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
    }

}
