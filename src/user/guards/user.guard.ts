import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


@Injectable()
export class UserGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const reflector = this.reflector;
        const users = this.reflector.getAllAndOverride<string[]>('test', [
            context.getHandler(),
            context.getClass(),
          ]);

        const ammarText = this.reflector.getAllAndOverride('ammar', [context.getHandler(), context.getClass()])
        console.log('ammar decorator text');
        console.log(ammarText);
        console.log('inside user guard =====');
        console.log(users);
        console.log('reflector =====================');
        console.log(reflector);
        return true;
    }
}