import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

class Database {
    private static pool: Pool

    public static getPool(): Pool {
        if (!this.pool) {
            this.pool = new Pool({
                user: process.env.DB_USER as string,
                host: process.env.DB_HOST as string,
                database: process.env.DB_NAME as string,
                password: process.env.DB_PASSWORD as string,
                port: Number(process.env.DB_PORT)
            })
        }
        return this.pool
    }
}

export default Database.getPool()