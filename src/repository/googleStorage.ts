import { Storage } from "@google-cloud/storage";

export class GoogleStorage {
  static async uploadImage(
    bucket: string,
    path: string,
    filename: string
  ): Promise<string> {
    const storage = new Storage();

    // Uploads a local file to the bucket
    await storage.bucket(bucket).upload(path, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: "public, max-age=31536000",
      },
    });
    // await storage.bucket("gs://story_pages").file(filename).makePublic();
    return `https://storage.googleapis.com/${bucket}/${filename}`;
  }
}
