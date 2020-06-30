import {MigrationInterface, QueryRunner} from "typeorm";

export class usersCreatedAt1593525514799 implements MigrationInterface {
    name = 'usersCreatedAt1593525514799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }

}
