import { Employee, employeeData } from "../models/Employee";

export class EmployeeService {
    private employee: Employee[] = employeeData

    private generateId(): number {
        let maxId = 0;
        for (let i = 0; i < this.employee.length; i++) {
            if (this.employee[i].id > maxId) {
                maxId = this.employee[i].id
            }
        }
        return maxId + 1
    }

    public getAllEmployee() {
        return this.employee
    }

    public createEmployee(employee: { name: string, position: string, salary: number, status: "Active" | "Inactive" }): Employee {
        const newId = this.generateId()
        const newEmployee: Employee = {
            id: newId,
            name: employee.name,
            position: employee.position,
            salary: employee.salary,
            status: employee.status
        }
        this.employee.push(newEmployee)
        return newEmployee
    }
}
