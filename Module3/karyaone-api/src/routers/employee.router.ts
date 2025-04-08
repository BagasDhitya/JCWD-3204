import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

export class EmployeeRouter {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController()
        this.routes();
    }

    private routes(): void {
        this.router.get('/employees', this.employeeController.findAll.bind(this.employeeController))
        this.router.get('/employees/:id', this.employeeController.findById.bind(this.employeeController))
        this.router.post('/employees', this.employeeController.create.bind(this.employeeController))
        this.router.put('/employees/:id', this.employeeController.update.bind(this.employeeController))
        this.router.delete('/employees/:id', this.employeeController.delete.bind(this.employeeController))
    }
}