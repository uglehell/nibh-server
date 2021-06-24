import { NextFunction, Request, Response } from 'express'
import UserModel, { IUser } from '../models/user-model'
import ApiError from '../services/exceptions/api-error'
import jwt from 'jsonwebtoken'
import UserDto from '../dtos/user-dto'

interface IDecodedToken {
  username: string
  id: string
  iat: number
  exp: number
}

class AppController {
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1]
      if (!accessToken) {
        throw ApiError.UnauthorizedError()
      }

      const jwtPayload = jwt.decode(accessToken) as IDecodedToken
      if (!jwtPayload) {
        throw ApiError.UnauthorizedError()
      }

      const username = jwtPayload.username

      const user = (await UserModel.findOne({ username })) as IUser

      return res.json(new UserDto(user))
    } catch (e) {
      next(e)
    }
  }

  getAppData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const counter = {
        value: 0,
        lastClick: '',
      }

      return res.json({ messages: [], counter })
    } catch (e) {
      next(e)
    }
  }
}

export default new AppController()
