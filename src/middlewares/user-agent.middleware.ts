import { HttpStatus, NestMiddleware, Optional } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
// function based middleware
export function userAgentMiddlewareFunction(req: Request, res: Response, next: NextFunction){
    const ua = req.headers['user-agent'];
    console.log(ua)
    req['ua'] = ua;

    next();
}

// class based middleware
// export class UserAgentMiddlewareClass implements NestMiddleware {
//     use(req: any, res: any, next: (error?: any) => void) {
//         const ua = req.headers['user-agent'];

//         if (!this.isUserAgentAcceptable(ua)) {
//             return res.status(HttpStatus.FORBIDDEN).json({message: 'Not Allowed'});
//         }
//         req['ua'] = ua;

//         next();
//     }

//     private isUserAgentAcceptable(userAgent) {
//         const acceptabeAgents = ["chrome", "firefox"];
//         if(acceptabeAgents.includes(userAgent)) {
//             return true;
//         } 
//         return false;
//     }
// }
export class UserAgentOptions {
    accepted?: string[]
}
export class UserAgentMiddlewareClass implements NestMiddleware {
    // userAgentOptions agar hum dependency injection ke through
    // lana chahte hain to isko provider me dalna pdega
    constructor(@Optional() private options: UserAgentOptions){}
    use(req: any, res: any, next: (error?: any) => void) {
        const ua = req.headers['user-agent'];

        if (!this.isUserAgentAcceptable(ua)) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'Not Allowed'});
        }
        req['ua'] = ua;

        next();
    }

    private isUserAgentAcceptable(userAgent: string) {
        const acceptabeUserAgents = this.options?.accepted || [];
        
        if(!acceptabeUserAgents.length){
            return true;
        }
        return acceptabeUserAgents.some((agent) => {
            userAgent.toLowerCase().includes(agent.toLowerCase());
        })
    }
}