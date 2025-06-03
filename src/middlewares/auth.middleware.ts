import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

function verifyJwtToken(token:string) {
    return true;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers.authorization?.split(" ")[1];

        // verification logic
        if (token && verifyJwtToken(token)) {
            next();
        }

        throw new UnauthorizedException('Invalid Token');
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if (token && verifyJwtToken(token)) {
        next();
    }

    throw new UnauthorizedException('Invalid Token');
}