import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';

export class EmployeeController {
    private employeeService: EmployeeService

    constructor() {
        this.employeeService = new EmployeeService()
    }

    public async getAllEmployees(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.employeeService.getAllEmployees()
            if (response !== "Data not found") {
                res.status(200).send({
                    message: "Successfully retrieve all data of employees",
                    status: res.statusCode,
                    data: response
                })
            } else {
                res.status(404).send({
                    message: response,
                    status: res.statusCode,
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, position, salary, status } = req.body;

            // Validasi input
            if (!name || !email || !position || !salary) {
                res.status(400).send({
                    message: "Bad Request: Missing required fields",
                    status: res.statusCode,
                });
                return;
            }

            // Panggil service untuk insert data
            const response = await this.employeeService.createEmployee(name, email, position, salary, status);

            // Perbaiki pengecekan response
            if (response && typeof response === "object") {
                res.status(201).send({
                    message: "Successfully created employee",
                    status: res.statusCode,
                    data: response
                });
            } else {
                res.status(500).send({
                    message: "Failed to create employee",
                    status: res.statusCode,
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
                detail: error instanceof Error ? error.message : error
            });
        }
    }

}