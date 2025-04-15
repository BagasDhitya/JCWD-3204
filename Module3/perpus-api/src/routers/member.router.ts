import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';

export class ControllerNameRouter {
    public router: Router;
    private memberController: MemberController;

    constructor() {
        this.router = Router();
        this.memberController = new MemberController();
        this.routes();
    }

    private routes(): void {
        this.router.get('/members/', this.memberController.getAllMember.bind(this.memberController));
        this.router.post('/members/', this.memberController.createMember.bind(this.memberController));
    }
}