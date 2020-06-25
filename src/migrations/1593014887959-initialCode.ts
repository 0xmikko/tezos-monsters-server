import {MigrationInterface, QueryRunner} from "typeorm";

export class initialCode1593014887959 implements MigrationInterface {
    name = 'initialCode1593014887959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ADD "initialCode" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "initialCode"`);
    }

}
