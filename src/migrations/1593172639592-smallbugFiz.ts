import {MigrationInterface, QueryRunner} from "typeorm";

export class smallbugFiz1593172639592 implements MigrationInterface {
    name = 'smallbugFiz1593172639592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "isStepSolved" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "isStepSolved" SET DEFAULT true`);
    }

}
