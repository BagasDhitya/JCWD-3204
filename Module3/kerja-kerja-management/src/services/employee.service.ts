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

    public getAllEmployee(searchName?: string, filterByStatus?: "Active" | "Inactive"): Employee[] {
        let result = [...this.employee]

        // untuk query search
        if (searchName) {
            result = result.filter((employee: Employee) => employee.name.toLowerCase().includes(searchName.toLowerCase()))
        }

        // untuk query filter
        if (filterByStatus === "Active") {
            result = result.filter((employee: Employee) => employee.status === "Active")
        } else if (filterByStatus === "Inactive") {
            result = result.filter((employee: Employee) => employee.status === "Inactive")
        }

        return result
    }

    public updateEmployeeStatus(id: number, status: "Active" | "Inactive"): Employee | null {
        const employee = this.employee.find(emp => emp.id === id);
        if (!employee) {
            return null;
        }

        employee.status = status;
        return employee;
    }

    public calculateNetSalary(id: number, deductions: number = 0, bonus: number = 0) {
        const employee = this.employee.find((employee: Employee) => employee.id === id)
        if (!employee) {
            return null;
        }

        const netSalary = employee.salary + bonus - deductions
        return {
            ...employee,
            bonus,
            deductions,
            netSalary
        }
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
