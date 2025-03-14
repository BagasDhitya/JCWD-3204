import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

// controller digunakan untuk memanage aliran komunikasi request dan response antar aplikasi
export class TodoController {
    private todoService: TodoService

    constructor() {
        this.todoService = new TodoService()
    }

    public async getAllTodos(req: Request, res: Response) {
        try {
            const response = await this.todoService.getAllTodos()
            if (response === "Todos not available") {
                res.status(400).send({
                    message: response,
                    status: res.status
                })
            } else {
                res.status(200).send({
                    data: response,
                    status: res.status
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.status
            })
        }
    }
}