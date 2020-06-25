import {MigrationInterface, QueryRunner} from "typeorm";

export class expectedAndContractName1593035354622 implements MigrationInterface {
    name = 'expectedAndContractName1593035354622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" ADD "contractName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "story_page" ADD "expected" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "expected"`);
        await queryRunner.query(`ALTER TABLE "story_page" DROP COLUMN "contractName"`);
    }

}
