import {MigrationInterface, QueryRunner} from "typeorm";

export class first1592659022356 implements MigrationInterface {
    name = 'first1592659022356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "story_page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "step" integer NOT NULL , "header" character varying NOT NULL, "text" character varying NOT NULL, "image" character varying NOT NULL, "hasQuestions" boolean NOT NULL, CONSTRAINT "PK_4cbc4e88f61f0521129dd1de5a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" integer NOT NULL , "name" character varying NOT NULL, "isCorrect" boolean NOT NULL, "message" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" character varying NOT NULL, "tezosAddress" character varying NOT NULL, "currentStep" integer NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "story_page"`);
    }

}
