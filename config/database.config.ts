import { registerAs } from "@nestjs/config";

// this is namespace configuration for database
export default registerAs(
    "database", 
    () => ({
        default: "postgres",
        connections: {
            postgres: {
                driver: "postgres",
                host: " ",
                port: 5432,
                username: " ",
                password: " ",
                database: " ",
            }
        }
    })
);