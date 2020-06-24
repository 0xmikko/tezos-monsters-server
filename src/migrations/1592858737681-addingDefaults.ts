import {MigrationInterface, QueryRunner} from "typeorm";

export class addingDefaults1592858737681 implements MigrationInterface {
    name = 'addingDefaults1592858737681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "index" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "name" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "isCorrect" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "message" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "icon" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "icon" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "message" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "isCorrect" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "index" DROP DEFAULT`);
    }

}
