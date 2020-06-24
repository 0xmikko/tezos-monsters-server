import {MigrationInterface, QueryRunner} from "typeorm";

export class isCodePage1592848195710 implements MigrationInterface {
    name = 'isCodePage1592848195710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ADD "isCodePage" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "isCodePage"`);
    }

}
