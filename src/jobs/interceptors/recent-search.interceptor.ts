import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, tap, throwError, timeout, TimeoutError } from "rxjs";
import { RecentSearchService } from "../services/recent-search.service";

@Injectable()
export class RecentSearchInterceptor implements NestInterceptor {
    constructor(private readonly recentSearchService: RecentSearchService) { }
    intercept(context: ExecutionContext, next: CallHandler) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const method = request.method;
        const url = request.url;
        // This is where you would implement the logic to handle recent searches
        console.log("RecentSearchInterceptor: Intercepting request for recent searches");

        // Call the next handler in the chain
        return next.handle().pipe(
            // agar 5 second ke andar response nahi mila to error throw kar do
            // agar response mil gaya to tap operator use kar ke data ko modify kar do
            // agar error aaya to catchError operator use kar ke error ko handle kar do
            timeout(5000), // Timeout after 5 seconds

            // response mil jayega hume
            tap((data: any) => {
                console.log("RecentSearchInterceptor: Data after handler execution", data);
                // You can modify the data here if needed
                return data;
            }),

            catchError((error: any) => {
                if (error instanceof TimeoutError) {
                    console.error("RecentSearchInterceptor: Request timed out", error);
                    // Handle the timeout error here, e.g., return a default value or throw a custom error
                    return throwError(() => new Error("Request timed out"));
                }
                return throwError(() => {   
                    console.error("RecentSearchInterceptor: Error occurred", error);
                    // Handle the error here, e.g., log it or modify the response
                    return error;
                }
                );
            })
        );
    }
}