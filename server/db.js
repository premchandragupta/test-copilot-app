import mongoose from 'mongoose'

export async function connectDB(uri) {
  mongoose.set('strictQuery', false) // meh: not recommended without care
  await mongoose.connect(uri)
  return mongoose
}
