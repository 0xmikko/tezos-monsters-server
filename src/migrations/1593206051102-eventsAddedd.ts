import {MigrationInterface, QueryRunner} from "typeorm";

export class eventsAddedd1593206051102 implements MigrationInterface {
    name = 'eventsAddedd1593206051102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_event" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "codeSubmitted" character varying NOT NULL, "result" boolean NOT NULL, "review" boolean NOT NULL, "profileId" character varying, "storyPageId" uuid, "answerId" uuid, CONSTRAINT "PK_d979b8a4d47b02b8f87322f33e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "game_event" ADD CONSTRAINT "FK_672014023fe4e8ab20cb65b1ebc" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_event" ADD CONSTRAINT "FK_7c01c1c985ac71d64d7ec756406" FOREIGN KEY ("storyPageId") REFERENCES "story_page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_event" ADD CONSTRAINT "FK_c1c5757949702166ea939cee932" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_event" DROP CONSTRAINT "FK_c1c5757949702166ea939cee932"`);
        await queryRunner.query(`ALTER TABLE "game_event" DROP CONSTRAINT "FK_7c01c1c985ac71d64d7ec756406"`);
        await queryRunner.query(`ALTER TABLE "game_event" DROP CONSTRAINT "FK_672014023fe4e8ab20cb65b1ebc"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "game_event"`);
    }

}
