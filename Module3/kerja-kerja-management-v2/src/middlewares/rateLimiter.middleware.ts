import { Request, Response, NextFunction } from 'express'
import { rateLimit } from 'express-rate-limit'

class RateLimitMiddleware {
    static limiter = rateLimit({
        windowMs: 10 * 1000, // 10 detik yang dibutuhkan untuk lanjut
        max: 3, // maksimum 3x request
        message: {
            error: "Too many attempts, please try again after 10s"
        },
        standardHeaders: true,
        legacyHeaders: false
    })

    static apply(req: Request, res: Response, next: NextFunction) {
        return RateLimitMiddleware.limiter(req, res, next)
    }
}

export default RateLimitMiddleware