import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
  const header = req.headers['authorization'] || ''
  const token = header.replace('Bearer ', '').trim()
  if (!token) return res.status(401).json({ error: 'no token' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me')
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ error: 'bad token' })
  }
}
