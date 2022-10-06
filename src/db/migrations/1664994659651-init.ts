import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664994659651 implements MigrationInterface {
    name = 'init1664994659651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_window" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "caption" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_06e6835db64cdc17e47c4a1aa2c" UNIQUE ("name"), CONSTRAINT "PK_dd8608394acd74b9f8782b3e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "roleType" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "serviceName" character varying(50) NOT NULL, "verbose" character varying(3) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_cf5bdaeca13c97ac8a01e8cd8bf" UNIQUE ("serviceName"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_app_window" ("appWindowId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_277aeb0886b8b4a6b308a448963" PRIMARY KEY ("appWindowId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0c48e7776fa6260aa05b505c9" ON "role_app_window" ("appWindowId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d8d149aab26be91f06d3723fa" ON "role_app_window" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "role_app_window" ADD CONSTRAINT "FK_e0c48e7776fa6260aa05b505c92" FOREIGN KEY ("appWindowId") REFERENCES "app_window"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_app_window" ADD CONSTRAINT "FK_5d8d149aab26be91f06d3723fa8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_app_window" DROP CONSTRAINT "FK_5d8d149aab26be91f06d3723fa8"`);
        await queryRunner.query(`ALTER TABLE "role_app_window" DROP CONSTRAINT "FK_e0c48e7776fa6260aa05b505c92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d8d149aab26be91f06d3723fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0c48e7776fa6260aa05b505c9"`);
        await queryRunner.query(`DROP TABLE "role_app_window"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "app_window"`);
    }

}
