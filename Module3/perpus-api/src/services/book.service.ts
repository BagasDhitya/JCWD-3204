import pool from '../config/database'
import { Book } from '../models/Book'

export class BookService {

    public async getAllBook(): Promise<Book[]> {
        const query = `SELECT * FROM books`
        const { rows } = await pool.query(query)
        return rows
    }

    public async createBook(book: Book): Promise<Book> {
        const { title, author, isbn, total_copies, available_copies } = book;
        const query = `INSERT INTO books(title, author, isbn, total_copies, available_copies) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const { rows } = await pool.query(query, [title, author, isbn, total_copies, available_copies])
        return rows[0]
    }
}