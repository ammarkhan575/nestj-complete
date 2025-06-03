// rate-limit.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate-limit';

export const RateLimit = (limit: number, ttlSeconds: number) => {
    console.log('inside rate limit decorator ======= ammar');
    return SetMetadata(RATE_LIMIT_KEY, { limit, ttlSeconds });
}
