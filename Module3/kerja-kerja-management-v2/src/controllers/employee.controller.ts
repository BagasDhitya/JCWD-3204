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

    public async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const response = await this.employeeService.getEmployeeById(Number(id))
            if (response !== undefined && response !== null) {
                res.status(200).send({
                    message: 'Successfully get employee by id',
                    status: res.statusCode,
                    data: response
                })
            } else {
                res.status(404).send({
                    message: 'Id not found',
                    status: res.statusCode
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async updateEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { name, email, position, salary, status } = req.body
            await this.employeeService.updateEmployee(Number(id), name, email, position, salary, status)
            res.status(201).send({
                message: 'Successfully update employee',
                status: res.statusCode
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            await this.employeeService.deleteEmployee(Number(id))
            res.status(201).send({
                message: 'Successfully delete employee',
                status: res.statusCode
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async updateEmployeeStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { status } = req.body
            await this.employeeService.updateStatusEmployee(Number(id), status)
            res.status(201).send({
                message: 'Successfully update status employee',
                status: res.statusCode
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async updateAdditionalSalary(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { bonus, deductions } = req.body
            const response = await this.employeeService.updateAdditionalSalary(Number(id), bonus, deductions)
           
                res.status(201).send({
                    message: 'Successfully added bonus and deductions',
                    status: res.statusCode,
                    data: response
                })

        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode,
            })
        }
    }

    public async calculateSalary(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const response = await this.employeeService.calculateSalary(Number(id))
            if (response) {
                res.status(200).send({
                    message: 'Successfully calculate salary',
                    status: res.statusCode,
                    data: response
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

            if (!name || !email || !position || !salary) {
                res.status(400).send({
                    message: "Bad Request: Missing required fields",
                    status: res.statusCode,
                });
                return;
            }

            const response = await this.employeeService.createEmployee(name, email, position, salary, status);

            if (response && typeof response === "object") {
                res.status(201).send({
                    message: "Successfully created employee",
                    status: res.statusCode,
                    data: response
                });
            } else {
                res.status(400).send({
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