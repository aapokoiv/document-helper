import { z } from "zod";
import dotenv from "dotenv"

const configSchema = z.object({
  MAX_UPLOAD_SIZE_BYTES: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER).default(100 * 1024 * 1024),
  UPLOAD_URL_EXPIRES_SECONDS: z.coerce.number().int().min(1).max(60000).default(300),
})

export type Config = z.infer<typeof configSchema>

dotenv.config();

let parsedEnv
try {
  parsedEnv = configSchema.parse(process.env)
  console.log("Environment validation passed")
} catch (err) {
  console.error("Environment validation failed:")
  console.error(JSON.stringify(err.format?.(), null, 2))
  process.exit(1)
}

export default parsedEnv as config
