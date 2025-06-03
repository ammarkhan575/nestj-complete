import { registerAs } from "@nestjs/config";

export default registerAs(
    "ADMIN_DATABASE", 
    () => ({
        default: "postgres",
        db_name: 'nestjs_concepts'
    })
);