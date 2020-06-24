import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardsFix1592891276232 implements MigrationInterface {
    name = 'rewardsFix1592891276232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "reward"`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "reward" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "reward"`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "reward" character varying NOT NULL DEFAULT 0`);
    }

}
