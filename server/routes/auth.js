import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const authRouter = express.Router()

// register (no validation; allows weak passwords)
authRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.create({ username, password }) // ⚠️ plaintext password
    res.json({ ok: true, id: user._id })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// login (plaintext compare; no throttling)
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'invalid credentials' })
  }
  const token = jwt.sign({ sub: user._id, username }, process.env.JWT_SECRET || 'dev-secret-change-me')
  res.json({ token })
})
