import {MigrationInterface, QueryRunner} from "typeorm";

export class users1593525263459 implements MigrationInterface {
    name = 'users1593525263459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "timeSpent" integer NOT NULL, "profileId" character varying, "storyPageId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL DEFAULT '', "name" character varying NOT NULL DEFAULT '', "given_name" character varying NOT NULL DEFAULT '', "family_name" character varying NOT NULL DEFAULT '', "role" character varying NOT NULL DEFAULT '', "avatar_url" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_55025fdd727e779e8d6108efb41" FOREIGN KEY ("storyPageId") REFERENCES "story_page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_55025fdd727e779e8d6108efb41"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_1d93e7137d3924bd95fc94d3b07"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
