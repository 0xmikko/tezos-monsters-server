import {MigrationInterface, QueryRunner} from "typeorm";

export class storyPageAuthUUID1592681268536 implements MigrationInterface {
    name = 'storyPageAuthUUID1592681268536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artifact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1f238d1d4ef8f85d0c0b8616fa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artifact"`);
    }

}
