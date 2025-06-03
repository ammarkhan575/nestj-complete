import { registerAs } from "@nestjs/config";

export default registerAs(
    "JWT", 
    () => ({
        SECRET: "",
        EXPIRES_IN: "1d",
    })

);