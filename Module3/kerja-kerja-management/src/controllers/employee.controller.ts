import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';

export class EmployeeController {
    private employeeService: EmployeeService;

    constructor() {
        this.employeeService = new EmployeeService()
    }

    public async getAllEmployee(req: Request, res: Response): Promise<void> {
        try {
           
            const searchName = req.query.searchName as string | undefined;
            const response = await this.employeeService.getAllEmployee(searchName);
            if (response) {
                res.status(200).send({
                    message: "Successfully retrieved data",
                    status: res.statusCode,
                    data: response
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode
            });
        }
    }

    public async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { name, position, salary, status } = req.body

            if (!name || !position || !salary || !status) {
                res.status(400).send({
                    message: "All fields are required"
                })
            }

            const newEmployee = {
                name: name,
                position: position,
                salary: salary,
                status: status
            }
            const response = await this.employeeService.createEmployee(newEmployee);
            if (response) {
                res.status(201).send({
                    message: "Successfully create employee data",
                    status: res.statusCode,
                    detail: response
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode
            })
        }
    }
}