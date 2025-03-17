import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

class EmployeeRouter {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/employees', this.employeeController.createEmployee.bind(this.employeeController));
        this.router.get('/employees', this.employeeController.getAllEmployee.bind(this.employeeController))
    }
}

export default new EmployeeRouter().router