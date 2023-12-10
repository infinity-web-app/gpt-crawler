import {Request, Response} from "express";
import {Config} from "./config.js";
import {crawl, write} from "./core.js";

const defaultConfig: Config = {
    url: "https://www.builder.io/c/docs/developers",
    maxPagesToCrawl: 50,
    match: "",
    outputFileName: "output.json"
};

export default {
    crawl: async (request: Request, response: Response) => {
        let config = defaultConfig;
        try {
            const config1 = request.body as Config;
            config = {
                ...config,
                ...config1
            };
        } catch (e) {
            response.status(400).send({message: 'Invalid request body.'});
        }

        try {
            await crawl(config);
            // todo serve written output.json file through express
            await write(config);
            response.status(200).send({message: 'Crawl completed successfully.'});
        } catch (e) {
            console.error('Error occurred in gpt-crawler.', e);
            response.status(500).send({message: 'Internal server error.'});
        }
    }
}
