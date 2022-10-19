import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameColumnLocationTbl1666186632385
  implements MigrationInterface
{
  name = 'renameColumnLocationTbl1666186632385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "BUDG.dbo.location.locationCode", "locationName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "BUDG.dbo.location.locationName", "locationCode"`,
    );
  }
}
