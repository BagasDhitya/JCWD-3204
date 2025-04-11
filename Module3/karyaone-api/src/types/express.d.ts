import { UserPayload } from "../models/interface";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}