// rate-limiter.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { RATE_LIMIT_KEY } from '../decorator/rate-limit.decorator';
  
  interface RateEntry {
    count: number;
    expiresAt: number;
  }
  
  @Injectable()
  export class RateLimiterGuard implements CanActivate {
    private requestsMap = new Map<string, RateEntry>();
  
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const rateLimit = this.reflector.getAllAndOverride<{ limit: number; ttlSeconds: number }>(
        RATE_LIMIT_KEY,
        [context.getHandler(), context.getClass()]
      );
      console.log('inside rate limiter guard ======');
      if (!rateLimit) return true; // No rate limit on this route)
      const request = context.switchToHttp().getRequest();
      const ip = request.ip || request.connection.remoteAddress;
      console.log(ip, 'ip address');
      const route = `${context.getClass().name}::${context.getHandler().name}`;
      console.log(route, 'route ========')
      const key = `${ip}:${route}`;
      console.log('key =====================', key)
      const now = Date.now();
      const entry = this.requestsMap.get(key);
  
      if (!entry || now > entry.expiresAt) {
        this.requestsMap.set(key, {
          count: 1,
          expiresAt: now + rateLimit.ttlSeconds * 1000,
        });
        return true;
      }
  
      if (entry.count < rateLimit.limit) {
        entry.count++;
        return true;
      }
  
      throw new UnauthorizedException('Too many requests. Please try again later.');
    }
  }
  