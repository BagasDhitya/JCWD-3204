import { prisma } from "../prisma/client";
import { JwtUtils } from "../lib/token.config";
import bcrypt from 'bcrypt'

export class AuthService {
    public async login(email: string, password: string) {

        // pengecekan apakah user sudah terdaftar atau belum
        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        // pengecekan pertama : kalau gagal ditolak
        if (!user) {
            return "Invalid credentials"
        }

        // kalau udah terdaftar, cek lagi passwordnya
        const isValid = await bcrypt.compare(user.password, password)

        // pengecekan kedua : kalau gagal ditolak
        if (!isValid) {
            return "Invalid credentials"
        }

        // tukar dengan token
        const token = JwtUtils.generateToken({
            id: user.id,
            name: user.name,
            role: user.role as any
        })

        return {
            name: user.name,
            role: user.role,
            access_token: token
        }
    }
}