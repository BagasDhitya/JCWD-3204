import { Request, Response, NextFunction } from 'express'

export class LoggerMiddleware {

    public handle(req: Request, res: Response, next: NextFunction) {
        const timestamp = new Date().toISOString()
        console.log(`${timestamp} - ${req.method} : ${req.url} from ${req.hostname}`)
        next()
    }
}

export default new LoggerMiddleware().handle