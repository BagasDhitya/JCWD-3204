import pool from '../config/database'
import { Member } from '../models/Member';

export class MemberService {

    public async getAllMember(): Promise<Member[]> {
        const query = `SELECT * from members`
        const { rows } = await pool.query(query)
        return rows
    }

    public async createMember(member: Member): Promise<Member> {
        const { name, email, phone } = member;
        const query = `INSERT INTO members(name,email,phone) VALUES ($1, $2, $3) RETURNING *`
        const { rows } = await pool.query(query, [name, email, phone])
        return rows[0]
    }
}