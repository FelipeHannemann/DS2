import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import estadoRouter from './router/estado.router';

class App {
    public express: express.Application

    constructor() {
        this.express = express();
        this.middleware();
    }
    //Carrega os middleware da aplicação 
    private middleware(){
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.routes();
    }

    private routes(): void {
        this.express.use('/estados', estadoRouter);
    }
}

export default new App().express;