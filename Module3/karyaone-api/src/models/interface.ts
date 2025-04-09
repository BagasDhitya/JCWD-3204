export interface EmployeeInput {
    name: string,
    email: string,
    password: string,
    role: "HR" | "EMPLOYEE",
    position: string,
    department: string,
}

export interface EmployeeQuery {
    search?: string,
    position?: string,
    department?: string,
    page?: number,
    limit?: number
}

export interface ClockInput {
    userId: number,
    date: Date
}

export interface AttendanceQuery {
    userId?: number,
    startDate?: string,
    endDate?: string
}