import { Router } from 'express';
import { EmailController } from '../controllers/email.controller';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

export class EmailRouter {
    public router: Router;
    private emailController: EmailController;

    constructor() {
        this.router = Router();
        this.emailController = new EmailController();
        this.routes();
    }

    private routes(): void {
        this.router.post('/email/blast',
            AuthenticationMiddleware.verifyToken,
            AuthorizationMiddleware.allowRoles("HR"),
            this.emailController.blastEmail.bind(this.emailController)
        );
    }
}