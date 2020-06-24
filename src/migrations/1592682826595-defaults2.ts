import {MigrationInterface, QueryRunner} from "typeorm";

export class defaults21592682826595 implements MigrationInterface {
    name = 'defaults21592682826595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tezosAddress" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "currentStep" SET DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "currentStep" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tezosAddress" DROP DEFAULT`);
    }

}
