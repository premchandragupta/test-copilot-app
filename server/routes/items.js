import express from 'express'
import { Item } from '../models/Item.js'
import { auth } from '../middleware/auth.js'

export const itemsRouter = express.Router()

// list all items (no ownership filter)
itemsRouter.get('/', auth, async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 }) // ⚠️ everyone sees everything
  res.json(items)
})

// create item (no input validation)
itemsRouter.post('/', auth, async (req, res) => {
  const { title, description } = req.body // ⚠️ could be anything
  const item = await Item.create({ title, description, owner: req.user?.username })
  res.json(item)
})

// search (NoSQL injection risk on purpose)
itemsRouter.get('/search', auth, async (req, res) => {
  const q = req.query.q || '' // e.g., {"$gt":""} tricks
  try {
    const filter = { title: { $regex: String(q), $options: 'i' } } // simplistic
    const items = await Item.find(filter).limit(50)
    res.json(items)
  } catch (e) {
    res.status(400).json({ error: 'bad query' })
  }
})
