import data from '../database/todo.database.json'

interface ITodos {
    id: number,
    title: string,
    completed: boolean,
    isDeleted: boolean,
    createdAt: string
}

// service digunakan untuk memanage logika bisnis aplikasi
export class TodoService {
    private todos: ITodos[] = data;
    private idCounter: number;

    constructor() {
        // menentukan idCounter berdasarkan ID terbesar dari data dummy
        let maxId = 0
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id > maxId) {
                maxId = this.todos[i].id
            }
        }
        this.idCounter = maxId + 1;
    }

    public getAllTodos(search?: string, filter?: string) {
        let result = [...this.todos]

        // untuk fitur search
        if (search) {
            result = result.filter((todo: ITodos) => todo.title.toLowerCase().includes(search.toLowerCase()))
        }

        // untuk fitur filter by category
        if (filter === "completed") {
            result = result.filter((todo: ITodos) => todo.completed)
        } else if (filter === "pending") {
            result = result.filter((todo: ITodos) => !todo.completed)
        }

        return result
    }

    public addTodo(title: string): ITodos {
        const newTodo: ITodos = {
            id: this.idCounter++,
            title: title,
            completed: false,
            isDeleted: false,
            createdAt: String(new Date())
        }
        this.todos.push(newTodo)
        return newTodo
    }

    public updateTodo(id: number, title?: string, completed?: boolean): string | ITodos {
        const todo = this.todos.find((value: ITodos) => value.id === id)

        if (!todo) {
            return "Todo not found"
        } else {
            if (title !== undefined) {
                todo.title = title
            }
            if (completed !== undefined) {
                todo.completed = completed
            }
            return todo
        }
    }

    // untuk mode hard delete
    public deleteTodo(id: number): string | ITodos {
        const index = this.todos.findIndex((value: ITodos) => value.id === id)
        if (index === -1) {
            return "Todo not found"
        } else {
            return this.todos.splice(index, 1)[0]
        }
    }

    // untuk mode soft delete
    public softDeleteTodo(id: number, isDeleted: boolean) {
        const todo = this.todos.find((value: ITodos) => value.id === id)

        if (!todo) {
            return "Todo not found"
        } else {
            if (isDeleted) {
                todo.isDeleted = isDeleted
            }
            return todo
        }
    }
}