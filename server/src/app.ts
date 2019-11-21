import * as express from "express";
import * as morgan from "morgan";
import Logger from "./logger";
import * as proxy from 'http-proxy-middleware';

import prerenderConfig from './config/prerender';
import appConfig from './config/app';
const cors = require('cors');
const prerender = require('prerender-node');
const path = require('path');

export default class App {

    private static appInstance: App;

    static get instance() : App {
        return App.getInstance();
    }


    public express: express.Application = express();

    private constructor(){

      prerender.set('prerenderToken', prerenderConfig.token);
      prerender.set('prerenderServiceUrl', prerenderConfig.url);
      this.config();

    }

     private static getInstance() {
        if (!App.appInstance) {
            App.appInstance = new App();
        }
        return App.appInstance;
    }

    private config(): void{

        process.on('uncaughtException', (err) => {
            Logger.error(err);
        });
        process.on('unhandledRejection', (err) => {
            Logger.error(err);
        });


        this.express.use(morgan('combined', { stream: {write: Logger.morganLog} }));

        this.express.use(cors());
        this.express.use(prerender);

        const options = {
          target: appConfig.api_service_url, // target host
          changeOrigin: false, // needed for virtual hosted sites
          xfwd: true
        };
        const exampleProxy = proxy(options);

        this.express.use('/robots.txt', exampleProxy);
        this.express.use('/sitemap.xml', exampleProxy);

        this.express.use(express.static(path.join(process.cwd(), 'public')));

        this.express.get('*', (req, res) =>{
        res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
      });
    }
}
