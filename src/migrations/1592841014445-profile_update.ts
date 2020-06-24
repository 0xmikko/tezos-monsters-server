import {MigrationInterface, QueryRunner} from "typeorm";

export class profileUpdate1592841014445 implements MigrationInterface {
    name = 'profileUpdate1592841014445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "name" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name"`);
    }

}
