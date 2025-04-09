import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendance.service';

export class AttendanceController {
    private attendanceService: AttendanceService

    constructor() {
        this.attendanceService = new AttendanceService()
    }

    public async clockIn(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body
            const date = new Date()
            const result = await this.attendanceService.clockIn({
                userId: userId,
                date: date
            })
            res.status(201).json({
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed clock in",
                error: error
            })
        }
    }

    public async clockOut(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body
            const date = new Date()
            const result = await this.attendanceService.clockOut({
                userId: userId,
                date: date
            })
            res.status(201).json({
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed clock out",
                error: error
            })
        }
    }

    public async getMonthlyAttendance(req: Request, res: Response): Promise<void> {
        try {
            const { userId, startDate, endDate } = req.query
            const result = await this.attendanceService.getMonthlyAttendance(
                { userId: Number(userId), startDate: String(startDate), endDate: String(endDate) }
            )
            res.status(200).json({
                data: result
            })
        } catch (error) {
            res.status(404).json({
                message: "Failed get monthly attendance",
                error: error
            })
        }
    }
}