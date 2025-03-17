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
        /**
         * @swagger
         * /api/employees:
         *   post:
         *     summary: Buat karyawan baru
         *     description: Menambahkan karyawan baru ke dalam sistem
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               position:
         *                 type: string
         *               salary:
         *                 type: number
         *     responses:
         *       201:
         *         description: Karyawan berhasil ditambahkan
         */
        this.router.post('/employees', this.employeeController.createEmployee.bind(this.employeeController));

        /**
         * @swagger
         * /api/employees:
         *   get:
         *     summary: Ambil semua data karyawan
         *     description: Mengembalikan daftar karyawan
         *     responses:
         *       200:
         *         description: Daftar karyawan berhasil diambil
         */
        this.router.get('/employees', this.employeeController.getAllEmployee.bind(this.employeeController));

        /**
         * @swagger
         * /api/employees/{id}:
         *   patch:
         *     summary: Perbarui status karyawan
         *     description: Mengubah status karyawan berdasarkan ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Status karyawan berhasil diperbarui
         */
        this.router.patch('/employees/:id', this.employeeController.updateEmployeeStatus.bind(this.employeeController));

        /**
         * @swagger
         * /api/employees/salary/{id}:
         *   patch:
         *     summary: Hitung gaji bersih karyawan
         *     description: Mengembalikan gaji bersih karyawan berdasarkan ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               bonus:
         *                 type: number
         *               deductions:
         *                 type: number
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Gaji bersih berhasil dihitung
         */
        this.router.patch('/employees/salary/:id', this.employeeController.calculateNetSalary.bind(this.employeeController));
    }
}

export default new EmployeeRouter().router;
