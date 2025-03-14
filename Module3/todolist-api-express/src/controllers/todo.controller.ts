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
            const { search, filter } = req.query
            const todos = await this.todoService.getAllTodos(search as string, filter as string)
            res.status(200).send({
                data: todos,
                status: res.statusCode
            })
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

    public async updateTodo(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id)
            const { title, completed } = req.body
            const response = await this.todoService.updateTodo(id, title, completed)
            if (response === "Todo not found") {
                res.status(404).send({
                    message: response,
                    status: res.statusCode
                })
            } else {
                res.status(201).send({
                    message: "Successfully update todo",
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

    public async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id)
            const response = await this.todoService.deleteTodo(id)
            if (response === "Todo not found") {
                res.status(404).send({
                    message: response,
                    status: res.statusCode
                })
            } else {
                res.status(201).send({
                    message: "Successfully delete todo with HARD DELETE",
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

    public async softDeleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id)
            const { isDeleted } = req.body
            const response = await this.todoService.softDeleteTodo(id, isDeleted)
            if (response === "Todo not found") {
                res.status(404).send({
                    message: response,
                    status: res.statusCode
                })
            } else {
                res.status(201).send({
                    message: "Successfully delete todo with SOFT DELETE",
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