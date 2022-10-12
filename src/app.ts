import * as dotenv from 'dotenv'
dotenv.config()
import cors from "cors";
import express, { Router } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import logger from 'morgan';
import Routes from './interfaces/route-interface';
import errorMiddleware from './middlewares/error.middleware';
import cookieParser from "cookie-parser";
import swaggerIgnite from './utils/swaggerIgnite';

class App {
    public app: express.Application;
    public port: (string | number);
    public env: boolean;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 80;
        this.env = process.env.NODE_ENV === 'production' ? true : false;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.initSwaggerDocs();
    }

    public listen() {
        if (process.env.NODE_ENV !== 'test') {
            this.app.listen(this.port, () => {
                console.log(`Updated Application listening on the port ${this.port}`)
            })
        }

    }

    public getServer() {
        return this.app;
    }

    public initSwaggerDocs() {
        swaggerIgnite(this.app);
    }

    private initializeMiddlewares() {
        if (this.env) {
            this.app.use(helmet());
            this.app.use(logger('combined'));
            this.app.use(cors({ origin: true, credentials: true }));
        } else {
            // this.app.use(logger('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use("view engine","ejs");
        this.app.use("views","views")
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/api', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }


    private async connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_CONNECTION_VERB } = process.env;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsCAFile: "./ca-certificate.crt"
        }
        if (this.env) {
            //prod db
        } else {
            console.log(MONGO_CONNECTION_VERB + '://' + MONGO_USER + ':' + MONGO_PASSWORD + MONGO_PATH, { ...options });
            const connectToDb = await mongoose.connect(MONGO_CONNECTION_VERB + '://' + MONGO_USER + ':' + MONGO_PASSWORD + MONGO_PATH, { ...options })
            if(connectToDb) console.log("connected to db")
        }
    }
}

export default App;