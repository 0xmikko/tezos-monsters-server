import {MigrationInterface, QueryRunner} from "typeorm";

export class profileUpdate21592841119824 implements MigrationInterface {
    name = 'profileUpdate21592841119824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "name" SET DEFAULT 'Warrior'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "name" SET DEFAULT ''`);
    }

}
