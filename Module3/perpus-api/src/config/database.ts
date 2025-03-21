import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

class Database {
    private static pool: Pool

    public static getPool(): Pool {
        if (!this.pool) {
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: Number(process.env.DB_PORT)
            })
        }
        return this.pool;
    }
}

export default Database.getPool();