import { Request, Response } from 'express';
import { MemberService } from '../services/member.service';
import { Member } from '../models/Member';

export class MemberController {
    private memberService: MemberService

    constructor() {
        this.memberService = new MemberService()
    }

    async getAllMember(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.memberService.getAllMember()
            res.status(200).send({
                message: 'Successfully get all members',
                status: res.statusCode,
                data: response
            })
        } catch (error) {
            res.status(404).send({
                message: 'Data not found',
                status: res.statusCode,
                detail: error
            })
        }
    }

    async createMember(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, phone }: Member = req.body
            const member: Member = {
                name: name,
                email: email,
                phone: phone
            }
            const response = await this.memberService.createMember(member)
            res.status(200).send({
                message: 'Successfully get all members',
                status: res.statusCode,
                data: response
            })
        } catch (error) {
            res.status(404).send({
                message: 'Data not found',
                status: res.statusCode,
                detail: error
            })
        }
    }
}