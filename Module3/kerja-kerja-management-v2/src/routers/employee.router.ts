import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import RateLimitMiddleware from '../middlewares/rateLimiter.middleware';

class EmployeeRouter {
    public router: Router;
    private employeeController: EmployeeController

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController()
        this.routes();
    }

    private routes(): void {
        this.router.get('/employees/', RateLimitMiddleware.apply, this.employeeController.getAllEmployees.bind(this.employeeController))
        this.router.get('/employees/:id', this.employeeController.getEmployeeById.bind(this.employeeController))
        this.router.post('/employees/', RateLimitMiddleware.apply, this.employeeController.createEmployee.bind(this.employeeController))
        this.router.put('/employees/:id', RateLimitMiddleware.apply, this.employeeController.updateEmployee.bind(this.employeeController))
        this.router.delete('/employees/:id', RateLimitMiddleware.apply, this.employeeController.deleteEmployee.bind(this.employeeController))
        this.router.patch('/employees/:id', RateLimitMiddleware.apply, this.employeeController.updateEmployeeStatus.bind(this.employeeController))
        this.router.get('/employees/:id/salary', this.employeeController.calculateSalary.bind(this.employeeController))
        this.router.patch('/employees/:id/additional-salary', RateLimitMiddleware.apply, this.employeeController.updateAdditionalSalary.bind(this.employeeController))
    }
}

export default new EmployeeRouter().router