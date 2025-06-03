import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map, tap } from 'rxjs/operators';
  
@Injectable()
export class TestingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Inside interceptor: before handler execution');
        return next.handle().pipe(
            map(data => {
              console.log('data instide map =======');
              console.log(data);
              console.log('Inside interceptor: after handler execution');
              return {
                status: 'success',
                data,
              };
            })
          );
    }
}