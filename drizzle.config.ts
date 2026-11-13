import { defineConfig } from "drizzle-kit"
import config from './api/utils/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './api/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: config.DATABASE_URL!,
  },
})
