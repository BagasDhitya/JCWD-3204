import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

export class AttendanceRouter {
    public router: Router;
    private attendanceController: AttendanceController;

    constructor() {
        this.router = Router();
        this.attendanceController = new AttendanceController();
        this.routes();
    }

    private routes(): void {
        this.router.post('/attendances/clock_in', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['HR', 'EMPLOYEE']), this.attendanceController.clockIn.bind(this.attendanceController));
        this.router.put('/attendances/clock_out', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles(['HR', 'EMPLOYEE']), this.attendanceController.clockOut.bind(this.attendanceController));
        this.router.get('/attendances/monthly', AuthenticationMiddleware.verifyToken, AuthorizationMiddleware.allowRoles('HR'), this.attendanceController.getMonthlyAttendance.bind(this.attendanceController))
    }
}