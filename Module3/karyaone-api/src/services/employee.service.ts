import { prisma } from "../prisma/client";
import { EmployeeInput, EmployeeQuery } from "../models/interface";

export class EmployeeService {
    public async create(data: EmployeeInput) {
        return prisma.user.create({ data })
    }

    public async findAll(query: EmployeeQuery) {
        const { search, position, department, page = 1, limit = 10 } = query
        const where: any = {}

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive'
            }
        }

        if (position) {
            where.position = position
        }

        if (department) {
            where.department = department
        }

        return prisma.user.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit
        })
    }

    public async findById(id: number) {
        return prisma.user.findUnique({
            where: { id }
        })
    }

    public async update(id: number, data: Partial<EmployeeInput>) {
        return prisma.user.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date()
            }
        })
    }

    public async delete(id: number) {
        return prisma.user.delete({
            where: { id }
        })
    }
}