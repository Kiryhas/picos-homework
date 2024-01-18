import winston from "winston";
import WinstonMongoDB from 'winston-mongodb';

export default class Logger {
    static logger = winston.createLogger({
        level: 'info',
        defaultMeta: { service: 'picos-homework' },
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            })
        ]
    })

    static init() {
        if (process.env.ENABLE_LOGGING !== 'true') {
            return;
        }

        Logger.logger.add(new WinstonMongoDB.MongoDB({
            db: 'mongodb://mongo:27017',
            level: 'info',
        }))
    }

    static get info() {
        return Logger.logger.info.bind(Logger.logger);
    }
    static get error() {
        return Logger.logger.error.bind(Logger.logger);
    }
}
