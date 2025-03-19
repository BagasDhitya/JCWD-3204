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
        this.router.get('/employees/:id', this.employeeController.getEmployeeById.bind(this.employeeController))
        this.router.post('/employees/', this.employeeController.createEmployee.bind(this.employeeController))
        this.router.put('/employees/:id', this.employeeController.updateEmployee.bind(this.employeeController))
        this.router.delete('/employees/:id', this.employeeController.deleteEmployee.bind(this.employeeController))
        this.router.patch('/employees/:id', this.employeeController.updateEmployeeStatus.bind(this.employeeController))
        this.router.get('/employees/:id/salary', this.employeeController.calculateSalary.bind(this.employeeController))
        this.router.patch('/employees/:id/additional-salary', this.employeeController.updateAdditionalSalary.bind(this.employeeController))
    }
}

export default new EmployeeRouter().router