import { z } from "zod";
import dotenv from "dotenv"

const configSchema = z.object({
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  MAX_UPLOAD_SIZE_BYTES: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER).default(100 * 1024 * 1024),
  UPLOAD_URL_EXPIRES_SECONDS: z.coerce.number().int().min(1).max(60000).default(300),
  DATABASE_URL: z.string().min(1),
})

export type Config = z.infer<typeof configSchema>

dotenv.config();

const parsedEnv = configSchema.safeParse(process.env)
if (!parsedEnv.success) {
  console.error("Environment validation failed:")
  console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2))
  process.exit(1)
}

export default parsedEnv.data
