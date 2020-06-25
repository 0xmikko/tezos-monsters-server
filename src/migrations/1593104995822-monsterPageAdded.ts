import {MigrationInterface, QueryRunner} from "typeorm";

export class monsterPageAdded1593104995822 implements MigrationInterface {
    name = 'monsterPageAdded1593104995822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ADD "isMonsterPage" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "isMonsterPage"`);
    }

}
