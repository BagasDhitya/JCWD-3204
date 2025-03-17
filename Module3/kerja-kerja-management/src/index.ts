import express, { Application } from 'express';
import employeeRouter from './routers/employee.router';
import { setupSwagger } from './config/swagger';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
        this.middlewares();
        this.routes();
        this.initializeSwagger()
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use("/api", employeeRouter)
    }

    private initializeSwagger(): void {
        setupSwagger(this.app)
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            console.log(`Swagger already available at http://localhost:${this.port}/api-docs`)
        });
    }
}

const server = new Server();
server.start();