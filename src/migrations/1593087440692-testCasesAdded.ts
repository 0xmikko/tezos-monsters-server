import {MigrationInterface, QueryRunner} from "typeorm";

export class testCasesAdded1593087440692 implements MigrationInterface {
    name = 'testCasesAdded1593087440692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_case" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" integer NOT NULL DEFAULT 1, "name" character varying NOT NULL DEFAULT '', "entrypoint" character varying NOT NULL DEFAULT '', "parameters" character varying NOT NULL DEFAULT '', "storage" character varying NOT NULL DEFAULT '', "expected" character varying NOT NULL DEFAULT '', "storyPageId" uuid, CONSTRAINT "PK_ddd6142bdceedfe5161a0406984" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "entrypoint"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "parameters"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "storage"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "expected"`);
        await queryRunner.query(`ALTER TABLE "test_case" ADD CONSTRAINT "FK_bfb06788d54b7254be2bf173645" FOREIGN KEY ("storyPageId") REFERENCES "story_page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_case" DROP CONSTRAINT "FK_bfb06788d54b7254be2bf173645"`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "expected" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "storage" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "parameters" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "entrypoint" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "test_case"`);
    }

}
