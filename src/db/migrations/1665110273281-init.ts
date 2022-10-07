import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665110273281 implements MigrationInterface {
    name = 'init1665110273281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(20) NOT NULL, "roleType" varchar(20) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_3c39bd046f5e69d37f0e4fe7688" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_824e186a844b0ca85bb8e6a14e5" DEFAULT getdate(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appWindow" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(30) NOT NULL, "caption" varchar(30) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e15823f85eedbc0046cb683f434" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_4368d764fc444351baddbc04346" DEFAULT getdate(), CONSTRAINT "UQ_c1a04ca8367851331ff02a1bf70" UNIQUE ("name"), CONSTRAINT "PK_770b333c1e7397b0a1629ab82eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "username" varchar(30) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(100) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" int NOT NULL IDENTITY(1,1), "serviceName" varchar(50) NOT NULL, "verbose" varchar(3) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_8127bc01a5b9d8570e4b539f022" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_c782c0aaf64ce85571609adb87a" DEFAULT getdate(), CONSTRAINT "UQ_cf5bdaeca13c97ac8a01e8cd8bf" UNIQUE ("serviceName"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roleAppWindow" ("appWindowId" int NOT NULL, "roleId" int NOT NULL, CONSTRAINT "PK_9ca3ee305bb83475867649c76bd" PRIMARY KEY ("appWindowId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98f1100b6f3390472a5a4a4604" ON "roleAppWindow" ("appWindowId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b23fe859ec1bf890f33c0a8ec6" ON "roleAppWindow" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "roleAppWindow" ADD CONSTRAINT "FK_98f1100b6f3390472a5a4a4604b" FOREIGN KEY ("appWindowId") REFERENCES "appWindow"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roleAppWindow" ADD CONSTRAINT "FK_b23fe859ec1bf890f33c0a8ec63" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roleAppWindow" DROP CONSTRAINT "FK_b23fe859ec1bf890f33c0a8ec63"`);
        await queryRunner.query(`ALTER TABLE "roleAppWindow" DROP CONSTRAINT "FK_98f1100b6f3390472a5a4a4604b"`);
        await queryRunner.query(`DROP INDEX "IDX_b23fe859ec1bf890f33c0a8ec6" ON "roleAppWindow"`);
        await queryRunner.query(`DROP INDEX "IDX_98f1100b6f3390472a5a4a4604" ON "roleAppWindow"`);
        await queryRunner.query(`DROP TABLE "roleAppWindow"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "appWindow"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
