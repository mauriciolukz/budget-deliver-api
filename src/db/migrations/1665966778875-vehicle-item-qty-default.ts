import { MigrationInterface, QueryRunner } from "typeorm";

export class vehicleItemQtyDefault1665966778875 implements MigrationInterface {
    name = 'vehicleItemQtyDefault1665966778875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicleItem" ADD CONSTRAINT "DF_9468f15b285ade0e43a1d697f77" DEFAULT 0 FOR "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicleItem" DROP CONSTRAINT "DF_9468f15b285ade0e43a1d697f77"`);
    }

}
