import {merge} from "lodash";

export interface AppConfig
{
    listen_port: number;
    env: string;
    api_service_url: string;
}

const baseConfig = require('./json/app.json');

const envConfig = {
    listen_port: process.env.LISTEN_PORT,
    env: process.env.ENV,
    api_service_url: process.env.API_SERVICE_URL
};

const appConfig : AppConfig = merge(baseConfig, envConfig);
export default  appConfig ;
