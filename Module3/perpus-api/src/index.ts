import express, { Application } from 'express';
import database from './config/database';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        // this.app.use('/api/RouterName', new RouterNameRouter().router);
    }

    private async testDbConnection() {
        try {
            await database.connect()
            console.log("Database successfully connected!")
        } catch (error) {
            console.log("Database error : ", error)
        }
    }

    public async start(): Promise<void> {
        await this.testDbConnection()
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const server = new Server();
server.start();