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

    public async getEmployeeById(id: number): Promise<void> {
        let query = `SELECT * from hr.employee WHERE id = $1`
        const { rows } = await this.pool.query(query, [id])
        return rows[0]
    }

    public async updateEmployee(id: number, name: string, email: string, position: string, salary: string, status: boolean): Promise<void> {
        let query = `UPDATE hr.employee SET name = $1,email = $2,position = $3,salary = $4,status = $5
        WHERE id = $6`
        const { rows } = await this.pool.query(query, [name, email, position, salary, status, id])
        return rows[0]
    }

    public async updateStatusEmployee(id: number, status: boolean): Promise<void> {
        let query = `UPDATE hr.employee SET status = $1 WHERE id = $2`
        const { rows } = await this.pool.query(query, [status, id])
        return rows[0]
    }

    public async updateAdditionalSalary(id: number, bonus: number, deductions: number): Promise<void> {
        let query = `UPDATE hr.employee SET bonus = $1, deductions = $2 WHERE id = $3 RETURNING *`
        const { rows } = await this.pool.query(query, [bonus, deductions, id])
        return rows[0]
    }

    public async calculateSalary(id: number) {
        let query = `SELECT salary, bonus, deductions FROM hr.employee WHERE id = $1`
        const { rows } = await this.pool.query(query, [id])

        const { salary, bonus, deductions } = rows[0]
        const netSalary = parseFloat(salary) + parseFloat(bonus) - parseFloat(deductions)
        return {
            id: id,
            salary: parseFloat(salary),
            bonus: parseFloat(bonus),
            deductions: parseFloat(deductions),
            net_salary: netSalary
        }
    }

    public async deleteEmployee(id: number): Promise<void> {
        let query = `DELETE FROM hr.employee WHERE id = $1`
        const { rows } = await this.pool.query(query, [id])
        return rows[0]
    }

    public async createEmployee(name: string, email: string, position: string, salary: string, status: boolean): Promise<void[]> {
        let query = `INSERT INTO hr.employee (name, email, position, salary, status)
        VALUES($1, $2, $3, $4, $5) RETURNING *`
        const { rows } = await this.pool.query(query, [name, email, position, salary, status])
        return rows[0]
    }
}