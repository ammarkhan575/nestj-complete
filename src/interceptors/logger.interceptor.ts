import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {

        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const startTime = Date.now();


        return next.handle().pipe(
            tap(() => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                console.log('startTime', startTime);
                console.log('endTime', endTime);
                console.log(`Request Method: ${request.method}`);
                console.log('reponseTime', responseTime, 'ms');
            })
        );
    }
}