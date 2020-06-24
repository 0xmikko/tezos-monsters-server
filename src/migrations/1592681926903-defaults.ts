import {MigrationInterface, QueryRunner} from "typeorm";

export class defaults1592681926903 implements MigrationInterface {
    name = 'defaults1592681926903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "step" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "header" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "text" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "image" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "hasQuestions" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "hasQuestions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "image" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "text" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "header" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "story_page" ALTER COLUMN "step" DROP DEFAULT`);
    }

}
