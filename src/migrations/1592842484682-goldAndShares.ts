import {MigrationInterface, QueryRunner} from "typeorm";

export class goldAndShares1592842484682 implements MigrationInterface {
    name = 'goldAndShares1592842484682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "gold" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "shares" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "shares"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "gold"`);
    }

}
