import { transporter } from "../lib/nodemailer.config";
import { announcementTemplate } from "../lib/templates/emailTemplate";
import { prisma } from "../prisma/client";

interface EmailFormat {
    subject: string,
    message: string,
}

export class EmailService {
    public async sendBlastEmail(data: EmailFormat) {
        const result = await prisma.user.findMany({
            select: {
                email: true
            }
        })

        const recipients = result.map((user) => user.email)

        const mailOptions = {
            from: 'HR Department',
            to: recipients,
            subject: data.subject,
            html: announcementTemplate(data.subject, data.message)
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    }
}