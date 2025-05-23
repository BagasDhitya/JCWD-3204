import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

export class TodoRoutes {
    public router: Router;
    private todoController: TodoController

    constructor() {
        this.router = Router()
        this.todoController = new TodoController()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get("/", this.todoController.getAllTodos.bind(this.todoController))
        this.router.post("/", this.todoController.addTodo.bind(this.todoController))
        this.router.put("/:id", this.todoController.updateTodo.bind(this.todoController))
        this.router.delete("/:id", this.todoController.deleteTodo.bind(this.todoController))
        this.router.patch("/:id", this.todoController.softDeleteTodo.bind(this.todoController))
    }
}

export default new TodoRoutes().router