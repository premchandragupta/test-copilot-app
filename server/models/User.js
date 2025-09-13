import mongoose from 'mongoose'

// ⚠️ INTENTIONALLY BAD: storing plaintext passwords.
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }, // should be hashed, left plaintext on purpose
  createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.model('User', UserSchema)
