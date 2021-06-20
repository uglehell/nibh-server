import { NextFunction, Request, Response } from 'express'
import UserModel, { IUser } from '../models/user-model'
import ApiError from '../services/exceptions/api-error'
import { loginValidation } from '../utils/loginValidation'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateAccessToken'
import UserDto from '../dtos/user-dto'

interface ILoginRequest {
  username: string
  password: string
}

interface IDecodedToken {
  username: string
  id: string
  iat: number
  exp: number
}

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      loginValidation(req)

      const { username, password } = req.body as ILoginRequest
      const user = (await UserModel.findOne({ username })) as IUser

      if (!user) {
        throw ApiError.BadRequest(`User ${username} not founded`)
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        throw ApiError.BadRequest(`Wrong password`)
      }

      const accessToken = generateAccessToken(user._id, username)
      return res.json({ accessToken })
    } catch (e) {
      next(e)
    }
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      loginValidation(req)

      const { username, password } = req.body as ILoginRequest
      const candidate = (await UserModel.findOne({ username })) as IUser

      if (candidate) {
        throw ApiError.BadRequest('Username is already taken')
      }

      const passwordHash = bcrypt.hashSync(password, 3)
      const user = new UserModel({ username, password: passwordHash })
      await user.save()

      return res.json({ message: 'User registered successfully' })
    } catch (e) {
      next(e)
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization as string
      const jwtPayload = jwt.decode(accessToken) as IDecodedToken
      const username = jwtPayload.username

      const user = await UserModel.findOne({ username }) as IUser

      return res.json(new UserDto(user))
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()
