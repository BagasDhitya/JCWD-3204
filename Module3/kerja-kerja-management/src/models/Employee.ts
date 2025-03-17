export interface Employee {
    id: number,
    name: string,
    position: string,
    salary: number,
    status: "Active" | "Inactive"
}

export const employeeData: Employee[] = [
    {
        "id": 1,
        "name": "John Doe",
        "position": "Software Engineer",
        "salary": 5000000,
        "status": "Active"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "position": "HR Manager",
        "salary": 7000000,
        "status": "Inactive"
    },
    {
        "id": 3,
        "name": "Michael Johnson",
        "position": "Product Manager",
        "salary": 8000000,
        "status": "Active"
    },
    {
        "id": 4,
        "name": "Emily Davis",
        "position": "Marketing Specialist",
        "salary": 6000000,
        "status": "Active"
    },
    {
        "id": 5,
        "name": "David Wilson",
        "position": "Sales Representative",
        "salary": 5500000,
        "status": "Inactive"
    }
]
