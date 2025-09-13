import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: String, // username string; no real FK
  createdAt: { type: Date, default: Date.now }
})

export const Item = mongoose.model('Item', ItemSchema)
