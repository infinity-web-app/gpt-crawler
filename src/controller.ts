import {Request, Response} from "express";
import {Config} from "./config.js";
import {crawl, write} from "./core.js";

const defaultConfig: Config = {
    match: [],
    url: "https://www.builder.io/c/docs/developers",
    maxPagesToCrawl: 50,
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

        config.outputFileName = "public/" + config.outputFileName;
        try {
            await crawl(config);
            // serving written output.json files through express
            const writtenFiles = await write(config);
            response.status(200).send({
                outputFiles: writtenFiles.map(f => f.replace("public", ""))
                    .map(f => 'https://gpt-crawler.infinityweb.dev' + f)
            });
        } catch (e) {
            console.error('Error occurred in gpt-crawler.', e);
            response.status(500).send({message: 'Internal server error.'});
        }
    }
}
