import { Pool } from "pg";
import database from "../config/database";

export class EmployeeService {

    private pool: Pool

    constructor() {
        this.pool = database
    }

    public async getAllEmployees(): Promise<any[] | string> {
        let query = 'SELECT * from hr.employee'
        const { rows } = await this.pool.query(query)
        if (rows.length > 0) {
            return rows
        } else {
            return "Data not found"
        }
    }

    public async createEmployee(name: string, email: string, position: string, salary: string, status: boolean) {
        let query = `INSERT INTO hr.employee (name, email, position, salary, status)
        VALUES($1, $2, $3, $4, $5)
        `
        const { rows } = await this.pool.query(query, [name, email, position, salary, status])
        return rows[0]
    }
}