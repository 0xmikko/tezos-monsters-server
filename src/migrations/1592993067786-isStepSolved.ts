import {MigrationInterface, QueryRunner} from "typeorm";

export class isStepSolved1592993067786 implements MigrationInterface {
    name = 'isStepSolved1592993067786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "isStepSolved" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "isStepSolved"`);
    }

}
