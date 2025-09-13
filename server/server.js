import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import { authRouter } from './routes/auth.js'
import { itemsRouter } from './routes/items.js'
import { exec } from 'child_process'

dotenv.config()

const app = express()
app.use(cors()) // ⚠️ wide open on purpose
app.use(express.json())
app.use(morgan('dev'))

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/copilot_demo'
const PORT = process.env.PORT || 5000

// health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// ⚠️ Dangerous endpoint: math eval (for scanner demos; do not use in real apps)
app.get('/api/math', (req, res) => {
  const expr = String(req.query.expr || '0')
  try {
    // eslint-disable-next-line no-eval
    const result = eval(expr) // INTENTIONALLY BAD
    res.json({ expr, result })
  } catch (e) {
    res.status(400).json({ error: 'bad expression' })
  }
})

// ⚠️ Very dangerous: executes system command (for scanner demo)
app.get('/api/exec', (req, res) => {
  const cmd = String(req.query.cmd || 'echo hello') // INTENTIONALLY BAD
  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: String(err) })
    res.type('text/plain').send(stdout || stderr)
  })
})

app.use('/api/auth', authRouter)
app.use('/api/items', itemsRouter)

connectDB(MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
}).catch(err => {
  console.error('DB connection error:', err)
  process.exit(1)
})
