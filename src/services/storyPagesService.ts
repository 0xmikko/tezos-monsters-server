import {Container, Inject, Service} from "typedi";
import {
    StoryPage,
    StoryPagesServiceI,
    StoryPageUpdateDTO,
} from "../core/storyPage";
import {StoryPageNotFound} from "../errors/storyPageNotFound";
import {Profile} from "../core/profile";
import {StoryPagesRepository} from "../repository/storyPagesRepository";
import { Storage } from '@google-cloud/storage';
import config from "../config";

@Service()
export class StoryPagesService implements StoryPagesServiceI {

    @Inject("StoryPagesRepository")
    private _repository: StoryPagesRepository;

    retrieve(user: Profile, id: string): Promise<StoryPage | undefined> {
        return this._repository.findOne(id);
    }

    async getPageIdByStep(step: number) : Promise<string> {
        const page = await this._repository.getPageByStep(step);
        return page === undefined ? 'error' : page.id;
    }



    list(): Promise<StoryPage[] | undefined> {
        return this._repository.list();
    }
    async create(dto: StoryPageUpdateDTO): Promise<StoryPage> {
        const storyPage = new StoryPage();
        storyPage.step = dto.step;
        storyPage.header = dto.header;
        storyPage.text = dto.text;
        storyPage.hasQuestions = dto.hasQuestions
        return this._repository.upsert(storyPage);
    }


    async update(id: string, dto: StoryPageUpdateDTO): Promise<StoryPage> {
        const storyPage = await this._repository.findOne(id);
        if (storyPage === undefined) throw StoryPageNotFound;
        storyPage.header = dto.header;
        storyPage.text = dto.text;
        storyPage.step = dto.step;
        storyPage.hasQuestions = dto.hasQuestions
        return this._repository.upsert(storyPage);
    }


    async uploadImage(id: string, path: string, filename: string) : Promise<StoryPage> {

        const storyPage = await this._repository.findOne(id);
        if (storyPage === undefined) throw StoryPageNotFound;

        const bucketName = config.storyPageImagesBucket;
        const storage = new Storage();

        // Uploads a local file to the bucket
        await storage.bucket(bucketName).upload(path, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });
        // await storage.bucket("gs://story_pages").file(filename).makePublic();
        storyPage.image = `https://storage.googleapis.com/${bucketName}/${filename}`;

        return await this._repository.upsert(storyPage);

    }

}
