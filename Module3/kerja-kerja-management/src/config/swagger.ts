import swaggerJsDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import { Application } from "express"

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KerjaKerja API',
            version: '1.0.0',
            description: 'API untuk mengelola data karyawan'
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development Server'
            }
        ]
    },
    apis: ['./src/routers/*.ts']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export function setupSwagger(app: Application) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
}