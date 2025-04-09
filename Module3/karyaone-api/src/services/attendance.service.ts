import { AttendanceQuery, ClockInput } from "../models/interface";
import { prisma } from "../prisma/client";

export class AttendanceService {

    public async clockIn({ userId, date }: ClockInput) {
        const now = new Date(date)

        const todayStart = new Date(date)
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date(date)
        todayEnd.setHours(23, 59, 59, 999)

        // pengecekan terhadap employee sebelum absensi
        const existing = await prisma.attendance.findFirst({
            where: {
                userId: userId,
                date: {
                    gte: todayStart,
                    lte: todayEnd
                }
            }
        })

        if (existing && existing.clockIn) {
            return "Sudah clock in hari ini"
        }

        if (existing && existing.clockOut) {
            return "Sudah clock out hari ini"
        }

        // mulai absensi
        const attendance = await prisma.attendance.create({
            data: {
                userId: userId,
                date: now,
                clockIn: now
            }
        })

        // beri batas keterlambatan
        const lateLimit = new Date(now)
        lateLimit.setHours(9, 1, 0, 0)

        if (now > lateLimit) {
            return {
                attendance: attendance,
                notes: "Kamu terlambat, harap datang lebih awal besok"
            }
        } else {
            return {
                attendance: attendance,
                notes: "Clock in berhasil. Semangat bekerja"
            }
        }
    }

    public async clockOut({ userId, date }: ClockInput) {
        const now = new Date(date)

        const todayStart = new Date(date)
        todayStart.setHours(0, 0, 0, 0)

        const todayEnd = new Date(date)
        todayEnd.setHours(23, 59, 59, 999)

        const existing = await prisma.attendance.findFirst({
            where: {
                userId: userId,
                date: {
                    gte: todayStart,
                    lte: todayEnd
                }
            }
        })

        if (!existing || !existing.clockIn) {
            return "Belum melakukan clock in"
        }

        const attendance = await prisma.attendance.update({
            where: { id: existing.id },
            data: { clockOut: now }
        })

        return {
            attendance: attendance,
            notes: "Berhasil clock out"
        }
    }

    public async getMonthlyAttendance({ userId, startDate, endDate }: AttendanceQuery) {

        const start = new Date(`${startDate}T00:00:00Z`)
        const end = new Date(`${endDate}T23:59:59Z`)

        return await prisma.attendance.findMany({
            where: {
                userId: userId,
                date: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: {
                date: "asc"
            }
        })
    }
}