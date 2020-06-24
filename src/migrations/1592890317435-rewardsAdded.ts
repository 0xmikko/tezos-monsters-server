import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardsAdded1592890317435 implements MigrationInterface {
    name = 'rewardsAdded1592890317435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ADD "reward" character varying NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "reward"`);
    }

}
