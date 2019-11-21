import {merge} from "lodash";

export interface PrerenderConfig
{
    token: string;
    url: string;
}

const baseConfig = require('./json/app.json');

const envConfig = {
    token: process.env.PRERENDER_TOKEN,
    url: process.env.PRERENDER_URL

};
const prerenderConfig : PrerenderConfig = merge(baseConfig, envConfig);
export default  prerenderConfig ;
