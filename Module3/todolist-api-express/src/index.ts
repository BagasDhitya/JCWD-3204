import express from 'express'
import todoRouter from './routers/todo.router'
import loggerMiddleware from './middlewares/logger.middleware'

class TodoServer {
    private app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    // config -> untuk pengaturan dari aplikasi Express nya
    private config() {
        this.app.use(express.json()) // -> middleware untuk parsing JSON
        this.app.use(loggerMiddleware) // -> middleware untuk melihat lalu lintas response dan request
    }

    // routes -> untuk pengaturan route dari setiap endpoint aplikasi
    private routes() {
        this.app.use("/todos", todoRouter)
    }

    // start -> untuk menjalankan server aplikasi
    public start() {
        const PORT = 8000;
        this.app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }
}

const todoServer = new TodoServer()
todoServer.start()