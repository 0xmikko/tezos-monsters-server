import {MigrationInterface, QueryRunner} from "typeorm";

export class oneManyRelationFix1592858627004 implements MigrationInterface {
    name = 'oneManyRelationFix1592858627004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ADD "storyPageId" uuid`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_b08cd0169d1e29b8f5d5ed06a88" FOREIGN KEY ("storyPageId") REFERENCES "story_page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_b08cd0169d1e29b8f5d5ed06a88"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "storyPageId"`);
    }

}
