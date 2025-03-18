import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

class EmployeeRouter {
    public router: Router;
    private employeeController: EmployeeController

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController()
        this.routes();
    }

    private routes(): void {
        this.router.get('/employees/', this.employeeController.getAllEmployees.bind(this.employeeController))
        this.router.post('/employees/', this.employeeController.createEmployee.bind(this.employeeController))
    }
}

export default new EmployeeRouter().router