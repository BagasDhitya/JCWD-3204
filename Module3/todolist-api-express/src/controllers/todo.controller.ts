import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

// controller digunakan untuk memanage aliran komunikasi request dan response antar aplikasi
export class TodoController {
    private todoService: TodoService

    constructor() {
        this.todoService = new TodoService()
    }

    public async getAllTodos(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.todoService.getAllTodos()
            if (response === "Todos not available") {
                res.status(400).send({
                    message: response,
                    status: res.statusCode
                })
            } else {
                res.status(200).send({
                    data: response,
                    status: res.statusCode
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode
            })
        }
    }

    public async addTodo(req: Request, res: Response): Promise<void> {
        try {
            const { title } = req.body
            const response = await this.todoService.addTodo(title)
            if (title === undefined) {
                res.status(400).send({
                    message: "Title is required",
                    status: res.statusCode
                })
            } else {
                res.status(201).send({
                    message: "Successfully add todo",
                    status: res.statusCode,
                    detail: response
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Internal server error",
                status: res.statusCode
            })
        }
    }
}