export interface ITodos {
    id: number,
    title: string,
    completed: boolean
}

export class Todo {
    private todos: ITodos[] = []
    private idCounter: number = 1

    // menampilkan semua todo
    getAllTodo(): ITodos[] {
        return this.todos
    }

    // menambahkan todo baru
    addTodo(title: string): ITodos {
        const newTodo: ITodos = {
            id: this.idCounter++,
            title: title,
            completed: false
        }
        this.todos.push(newTodo)
        return newTodo
    }

    // mengupdate todo
    updateTodo(id: number, title?: string, completed?: boolean): ITodos | { error: string } {
        const todo = this.todos.find((value: ITodos) => value.id === id)

        // untuk mengecek apakah id yang dimaksud itu ditemukan
        if (!todo) {
            return {
                error: "Todo not found"
            }
        }

        // kalau id nya ditemukan, bisa update titlenya (opsional)
        if (title !== undefined) {
            todo.title = title
        }

        // kalau id nya ditemukan, bisa update completenya (opsional)
        if (completed !== undefined) {
            todo.completed = completed
        }

        return todo
    }

    // menghapus todo
    deleteTodo(id: number): ITodos | { error: string } {
        const index = this.todos.findIndex((value: ITodos) => value.id === id)
        if (index === -1) {
            return {
                error: "Todo not found"
            }
        }
        return this.todos.splice(index, 1)[0]
    }

}