import data from '../database/todo.database.json'

interface ITodos {
    id: number,
    title: string,
    completed: boolean
}

// service digunakan untuk memanage logika bisnis aplikasi
export class TodoService {
    private todos: ITodos[] = data;
    private idCounter: number = 1;

    public getAllTodos(): ITodos[] | string {
        if (this.todos.length > 0) {
            return this.todos
        } else {
            return "Todos not available"
        }
    }

    public addTodo(title: string): ITodos {
        const newTodo: ITodos = {
            id: this.idCounter++,
            title: title,
            completed: false
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
}