import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '../config/jwt-secrets'

export const generateAccessToken = (id: Schema.Types.ObjectId, username: string) => {
  const payload = {
    id,
    username,
  }

  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '24h' })
}
