import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { EmployeeInput, EmployeeQuery } from '../models/interface';
import { CloudinaryService } from '../lib/cloudinary.config';
import { prisma } from '../prisma/client';

export class EmployeeController {
    private employeeService: EmployeeService
    private cloudinaryService: CloudinaryService

    constructor() {
        this.employeeService = new EmployeeService()
        this.cloudinaryService = new CloudinaryService()
    }

    public async uploadPayslip(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params

            if (!req.file) {
                res.status(400).json({
                    message: "No file uploaded",
                })
            }

            const url = await this.cloudinaryService.uploadFile(req.file as any)

            const payslip = await prisma.payslip.create({
                data: {
                    userId: parseInt(id),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear(),
                    fileUrl: String(url),
                    salary: 6500000
                }
            })

            res.status(200).json({
                data: payslip
            })
        } catch (error) {
            res.status(400).json({
                message: "Error : upload failed",
                detail: error
            })
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const data: EmployeeInput = req.body
            const result = await this.employeeService.create(data)
            res.status(201).json({
                message: "Employee created",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to create employee",
                detail: error
            })
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const query: EmployeeQuery = {
                search: req.query.search as string,
                position: req.query.position as string,
                department: req.query.department as string,
                page: req.query.page ? parseInt(req.query.page as string) : 1,
                limit: req.query.limit ? parseInt(req.query.limit as string) : 10
            }
            const result = await this.employeeService.findAll(query)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            res.status(404).json({
                message: "Failed to fetch employee",
                detail: error
            })
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const result = await this.employeeService.findById(Number(id))

            if (!result) {
                res.status(404).json({
                    message: "Employee not found"
                })
            }

            res.status(200).json({
                data: result
            })
        } catch (error) {
            res.status(404).json({
                message: "Failed to fetch employee",
                detail: error
            })
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const data: Partial<EmployeeInput> = req.body
            const result = await this.employeeService.update(Number(id), data)
            res.status(200).json({
                message: "Employee updated",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to update employee",
                detail: error
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const result = await this.employeeService.delete(Number(id))
            res.status(200).json({
                message: "Employee deleted",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to delete employee",
                detail: error
            })
        }
    }
}