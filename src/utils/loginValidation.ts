import { Request } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../services/exceptions/api-error'

export const loginValidation = (req: Request) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw ApiError.BadRequest('Incorrect user data', errors.array())
  }
}
