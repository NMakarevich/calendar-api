import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameImageField1673713949415 implements MigrationInterface {
  name = 'renameImageField1673713949415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "imageBuffer" TO "imageName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "imageName" TO "imageBuffer"`,
    );
  }
}
