import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { appRouter } from './src';
import { Logger } from './src/services';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use(appRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json({
        status: 'Error',
        details: err.message,
    });
});

app.listen(port, () => {
    Logger.init();
    console.log('Server is live');
});
