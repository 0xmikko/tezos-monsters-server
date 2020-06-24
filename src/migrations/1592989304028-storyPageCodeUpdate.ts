import {MigrationInterface, QueryRunner} from "typeorm";

export class storyPageCodeUpdate1592989304028 implements MigrationInterface {
    name = 'storyPageCodeUpdate1592989304028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "hasQuestions"`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "codeRightAnswer" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "entrypoint" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "parameters" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "storage" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "screenTime" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "screenTime"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "storage"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "parameters"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "entrypoint"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "codeRightAnswer"`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "hasQuestions" boolean NOT NULL DEFAULT false`);
    }

}
