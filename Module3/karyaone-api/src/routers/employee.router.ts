import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';

export class EmployeeRouter {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController()
        this.routes();
    }

    private routes(): void {
        this.router.get('/employees', AuthenticationMiddleware.verifyToken, this.employeeController.findAll.bind(this.employeeController))
        this.router.get('/employees/:id', AuthenticationMiddleware.verifyToken, this.employeeController.findById.bind(this.employeeController))
        this.router.post('/employees', AuthenticationMiddleware.verifyToken, this.employeeController.create.bind(this.employeeController))
        this.router.put('/employees/:id', AuthenticationMiddleware.verifyToken, this.employeeController.update.bind(this.employeeController))
        this.router.delete('/employees/:id', AuthenticationMiddleware.verifyToken, this.employeeController.delete.bind(this.employeeController))
    }
}