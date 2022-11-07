import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1667429111421 implements MigrationInterface {
  name = 'init1667429111421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "location" ("id" int NOT NULL IDENTITY(1,1), "locationName" varchar(60) NOT NULL, "address" varchar(255) NOT NULL CONSTRAINT "DF_3b8321b0dc9a9cb2e81bfb52cc0" DEFAULT '', "phone1" varchar(30) NOT NULL CONSTRAINT "DF_7e90ed70f9886fabd637f14e586" DEFAULT '', "phone2" varchar(30) NOT NULL CONSTRAINT "DF_4e63b9c911afb2cdf8373850bf7" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_09dee1a3d42723079bd45577916" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b21f4d902db7cc1c5db2e86d3d1" DEFAULT getdate(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(20) NOT NULL, "roleType" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_3c39bd046f5e69d37f0e4fe7688" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_824e186a844b0ca85bb8e6a14e5" DEFAULT getdate(), CONSTRAINT "UQ_58c914421982fb6442fea6fc5d9" UNIQUE ("name", "roleType"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appWindow" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(30) NOT NULL, "caption" varchar(30) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e15823f85eedbc0046cb683f434" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_4368d764fc444351baddbc04346" DEFAULT getdate(), CONSTRAINT "UQ_c1a04ca8367851331ff02a1bf70" UNIQUE ("name"), CONSTRAINT "PK_770b333c1e7397b0a1629ab82eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("id" int NOT NULL IDENTITY(1,1), "serviceName" varchar(50) NOT NULL, "verbose" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_8127bc01a5b9d8570e4b539f022" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_c782c0aaf64ce85571609adb87a" DEFAULT getdate(), CONSTRAINT "UQ_cf5bdaeca13c97ac8a01e8cd8bf" UNIQUE ("serviceName"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "driver" ("id" int NOT NULL IDENTITY(1,1), "firstName" varchar(50) NOT NULL, "middleName" varchar(50) NOT NULL, "lastName" varchar(50) NOT NULL, "phone1" varchar(30) NOT NULL, "phone2" varchar(30) NOT NULL CONSTRAINT "DF_2cc9cbaff016a2cb0ebbba2449a" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_aa47e46c36d965a5ae0e7f75775" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_058ea7a6f99dc34009a49509e3b" DEFAULT getdate(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "username" varchar(30) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(100) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "itemMaster" ("id" int NOT NULL IDENTITY(1,1), "description" varchar(100) NOT NULL, "itemType" smallint NOT NULL, "useQty" bit NOT NULL CONSTRAINT "DF_192a05fdc130e0708a852132119" DEFAULT 0, "createdAt" datetime NOT NULL CONSTRAINT "DF_65848bddeb302a9b9038f32d479" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_a2c7f5a3c97b9b61c1ccdfba814" DEFAULT getdate(), CONSTRAINT "UQ_a00b54ed8ecabec62472c794bd7" UNIQUE ("description"), CONSTRAINT "PK_5aff43f41bfa220ce4bf516d369" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "desc-idx" ON "itemMaster" ("description") `,
    );
    await queryRunner.query(
      `CREATE TABLE "openTransaction" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "abrev" varchar(10) NOT NULL, "trxNumber" varchar(15) NOT NULL, "vehicleId" smallint NOT NULL, "make" varchar(30) NOT NULL, "model" varchar(30) NOT NULL, "color" varchar(30) NOT NULL, "currentKm" int NOT NULL, "trxKm" int NOT NULL, "fuelLevel" varchar(3) NOT NULL CONSTRAINT "DF_eff9d5495aa298c0881892fff8f" DEFAULT '', "trxLocation" varchar(60) NOT NULL, "toLocation" varchar(60) NOT NULL CONSTRAINT "DF_c1edaf7e26ae2456c1816c77b42" DEFAULT '', "username" varchar(30) NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_0c40dc9b4e909f78efbbef1266d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_65f19c5cc4a599000618e6babd3" DEFAULT getdate(), CONSTRAINT "UQ_4d1085e3dc34e60aa7e1bea474e" UNIQUE ("vehicleId", "check"), CONSTRAINT "UQ_9fbb3f11b5206e0e47963d51fcc" UNIQUE ("trxType", "trxNumber"), CONSTRAINT "PK_679d2864cbc49f5ee190b9aa921" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactionConfig" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "abrev" varchar(10) NOT NULL, "nextNumber" varchar(15) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_49264857ebea8f1cea21624e1bb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d8c52fb0368149e7ac808bba9bf" DEFAULT getdate(), CONSTRAINT "PK_615e11f83697965c91a4acd6716" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactionItem" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "trxNumber" varchar(15) NOT NULL, "itemId" smallint NOT NULL, "quantity" smallint NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_a70c45799c5916a8ac7b1fc45fe" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_ceaf3e2958ae94e1ae7e3fce36a" DEFAULT getdate(), CONSTRAINT "PK_b36898b318e7f9391e76ab897eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactionWheel" ("id" int NOT NULL IDENTITY(1,1), "trxType" smallint NOT NULL, "trxNumber" varchar(10) NOT NULL, "spare" smallint NOT NULL CONSTRAINT "DF_5e84bada9469edb351ceb059eba" DEFAULT 0, "tyrePressureLevel" smallint NOT NULL, "tyreUsefulLife" smallint NOT NULL, "tyreUsfLifeRemark" varchar(255) NOT NULL CONSTRAINT "DF_157af89523ce52d2b08047ac2ae" DEFAULT '', "tyreMarkCondition" varchar(15) NOT NULL, "rimType" varchar(15) NOT NULL, "rimPainting" varchar(15) NOT NULL, "rimMarkCondition" varchar(15) NOT NULL, "check" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_0aa510e431114f8fe40ac60bc9a" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_bec33dba4cd0431e53e0f8b353e" DEFAULT getdate(), CONSTRAINT "PK_e222b8208b65d052550f0b5043a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehiclePhoto" ("id" int NOT NULL IDENTITY(1,1), "groupName" varchar(21) NOT NULL, "name" varchar(50) NOT NULL, "urlImage" varchar(255) NOT NULL, "vehicleId" int, CONSTRAINT "PK_c3d6ffb47a7d6308f9c51805999" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "group-name-idx" ON "vehiclePhoto" ("groupName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" int NOT NULL IDENTITY(1,1), "MVA" varchar(30) NOT NULL, "make" varchar(30) NOT NULL, "model" varchar(30) NOT NULL, "color" varchar(30) NOT NULL, "plateNum" varchar(30) NOT NULL, "keyNum" varchar(30) NOT NULL, "currentKm" int NOT NULL CONSTRAINT "DF_3dc6d6c6dd10315f055412e3a8d" DEFAULT 0, "fuelLevel" varchar(3) NOT NULL CONSTRAINT "DF_1678768bf2b12c484b3eaab0d5a" DEFAULT '', "remark" varchar(255) NOT NULL CONSTRAINT "DF_2a6b61ad37886eac0d4d427804a" DEFAULT '', "lastOilChangeDate" datetime, "nextOilChangeDate" datetime, "nextOilChangeKm" int, "location" varchar(50) NOT NULL CONSTRAINT "DF_d73e3d67dc6c76c049f754af41f" DEFAULT '', "isAvailable" bit NOT NULL CONSTRAINT "DF_d713fd55d35b4b94a2f35560d74" DEFAULT 1, "lastTrxNumber" varchar(15) NOT NULL CONSTRAINT "DF_32259c3bd44b9e0d58972d13b70" DEFAULT '', "lastTrxAbrev" varchar(10) NOT NULL CONSTRAINT "DF_283d1ebf48708b82c51654e6011" DEFAULT '', "createdAt" datetime NOT NULL CONSTRAINT "DF_79d54819538d79f47d5ef5a154d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_03f27141dc4d4bb5e3079214bd7" DEFAULT getdate(), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "mva-idx" ON "vehicle" ("MVA") `);
    await queryRunner.query(
      `CREATE TABLE "vehicleItem" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime NOT NULL CONSTRAINT "DF_ee2e05b19e434e3f751f43fcce3" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b3d7f25f2665999d9782d65a2e4" DEFAULT getdate(), "quantity" smallint NOT NULL CONSTRAINT "DF_9468f15b285ade0e43a1d697f77" DEFAULT 0, "vehicleId" int, "itemId" int, CONSTRAINT "vehicleId-itemId" UNIQUE ("vehicleId", "itemId"), CONSTRAINT "PK_4b709ce0fde3c56c5977a60a174" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roleAppWindow" ("appWindowId" int NOT NULL, "roleId" int NOT NULL, CONSTRAINT "PK_9ca3ee305bb83475867649c76bd" PRIMARY KEY ("appWindowId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98f1100b6f3390472a5a4a4604" ON "roleAppWindow" ("appWindowId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b23fe859ec1bf890f33c0a8ec6" ON "roleAppWindow" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "vehiclePhoto" ADD CONSTRAINT "FK_4764469ce0d32b1fd4212a65b7e" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicleItem" ADD CONSTRAINT "FK_166e354d7c4ee07721531fcf86a" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicleItem" ADD CONSTRAINT "FK_4a5693492d3d5e35018b5590b89" FOREIGN KEY ("itemId") REFERENCES "itemMaster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roleAppWindow" ADD CONSTRAINT "FK_98f1100b6f3390472a5a4a4604b" FOREIGN KEY ("appWindowId") REFERENCES "appWindow"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roleAppWindow" ADD CONSTRAINT "FK_b23fe859ec1bf890f33c0a8ec63" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roleAppWindow" DROP CONSTRAINT "FK_b23fe859ec1bf890f33c0a8ec63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roleAppWindow" DROP CONSTRAINT "FK_98f1100b6f3390472a5a4a4604b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicleItem" DROP CONSTRAINT "FK_4a5693492d3d5e35018b5590b89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicleItem" DROP CONSTRAINT "FK_166e354d7c4ee07721531fcf86a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehiclePhoto" DROP CONSTRAINT "FK_4764469ce0d32b1fd4212a65b7e"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b23fe859ec1bf890f33c0a8ec6" ON "roleAppWindow"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_98f1100b6f3390472a5a4a4604" ON "roleAppWindow"`,
    );
    await queryRunner.query(`DROP TABLE "roleAppWindow"`);
    await queryRunner.query(`DROP TABLE "vehicleItem"`);
    await queryRunner.query(`DROP INDEX "mva-idx" ON "vehicle"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
    await queryRunner.query(`DROP INDEX "group-name-idx" ON "vehiclePhoto"`);
    await queryRunner.query(`DROP TABLE "vehiclePhoto"`);
    await queryRunner.query(`DROP TABLE "transactionWheel"`);
    await queryRunner.query(`DROP TABLE "transactionItem"`);
    await queryRunner.query(`DROP TABLE "transactionConfig"`);
    await queryRunner.query(`DROP TABLE "openTransaction"`);
    await queryRunner.query(`DROP INDEX "desc-idx" ON "itemMaster"`);
    await queryRunner.query(`DROP TABLE "itemMaster"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "appWindow"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "location"`);
  }
}
