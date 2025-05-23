import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SENDER as string,
        pass: process.env.EMAIL_PASSWORD as string
    }
})