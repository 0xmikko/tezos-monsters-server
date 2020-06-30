import {MigrationInterface, QueryRunner} from "typeorm";

export class usersCreatedAt1593525514800 implements MigrationInterface {
    name = 'usersCreatedAt1593525514800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
