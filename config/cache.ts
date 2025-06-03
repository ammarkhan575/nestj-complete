import { registerAs } from "@nestjs/config";

export default registerAs(
    "cache", 
    ()=> ({
        default : "redis",
        stores: {
            redis: {
              driver: "redis",
            //   host: process.env.REDIS_HOST || "127.0.0.1",
            host: "127.0.0.1",
            //   password: process.env.REDIS_PASSWORD || undefined,
            password: "password",
            //   port: process.env.REDIS_PORT || 6379,
            port: 6379,
            //   database: process.env.REDIS_DB || 0,
            database: '0',
            prefix: "nestjs_boilerplate",
            },
        }
    })
);