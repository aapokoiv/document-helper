import { randomUUID } from 'node:crypto'
import express from 'express'
import { z } from 'zod'

import config from './utils/config'

const app = express()

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const uploadRequest = z.object({
  filename: z.string().trim().min(1).max(255)
    .refine(name => !/[\\/\x00-\x1f\x7f]/.test(name), "Must be a filename without path separators or control characters"),
  contentType: z.literal("application/pdf"),
  sizeBytes: z.number().int().positive().max(config.MAX_UPLOAD_SIZE_BYTES),
}).strict();

app.post("/documents/uploads", async (req, res) => {
  const result = uploadRequest.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: "INVALID_UPLOAD_REQUEST", issues: result.error.issues })
      return
    }
    const input = result.data
    if (!input.filename.toLowerCase().endsWith(".pdf")) {
      res.status(400).json({ error: "INVALID_FILE_EXTENSION" })
      return
    }

    const id = randomUUID()
    const storageKey = `documents/${id}/uploads`
    const expiresInSeconds = config.UPLOAD_URL_EXPIRES_SECONDS
    const uploadExpiresAt = new Date(Date.now() + expiresInSeconds * 1000)
    res.status(501).json({ error: "UPLOAD_NOT_IMPLEMENTED" })
})

export default app
