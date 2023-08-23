import { cleanEnv, port, str } from "envalid";

export function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    MONGO_URI: str(),
    RAPID_KEY: str(),
    PORT: port({ default: 8080 }),
  });
}
