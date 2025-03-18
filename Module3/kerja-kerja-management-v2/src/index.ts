import express, { Application } from 'express';
import database from './config/database';
import EmployeeRouter from './routers/employee.router';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/api/v2', EmployeeRouter);
    }

    private async testDatabaseConnection() {
        try {
            const client = await database.connect()
            console.log('Database connected successfully')
            client.release()
        } catch (error) {
            console.log('Database connection failed : ', error)
            process.exit()
        }
    }

    public async start(): Promise<void> {
        await this.testDatabaseConnection()
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const server = new Server();
server.start();