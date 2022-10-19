import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateLocationTbl1666142464685 implements MigrationInterface {
  name = 'updateLocationTbl1666142464685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(
      `CREATE TABLE "location" ("id" int NOT NULL IDENTITY(1,1), "locationCode" varchar(60) NOT NULL, "address" varchar(255) NOT NULL CONSTRAINT "DF_3b8321b0dc9a9cb2e81bfb52cc0" DEFAULT '', "phone1" varchar(30) NOT NULL CONSTRAINT "DF_7e90ed70f9886fabd637f14e586" DEFAULT '', "phone2" varchar(30) NOT NULL CONSTRAINT "DF_4e63b9c911afb2cdf8373850bf7" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_09dee1a3d42723079bd45577916" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b21f4d902db7cc1c5db2e86d3d1" DEFAULT getdate(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "location"`);
  }
}
