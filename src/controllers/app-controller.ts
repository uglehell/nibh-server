import { NextFunction, Request, Response } from 'express'
import UserModel, { IUser } from '../models/user-model'
import UserDto from '../dtos/user-dto'
import { getAccessTokenPayload } from '../utils/getAccessTokenPayload'
import MessageModel, { IMessage } from '../models/message-model'
import MessageDto from '../dtos/message-dto'

class AppController {
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = getAccessTokenPayload(req)

      const user = (await UserModel.findById(id)) as IUser

      return res.json(new UserDto(user))
    } catch (e) {
      next(e)
    }
  }

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = (await MessageModel.find()) as IMessage[]

      return res.json({
        messages: messages.map((message) => new MessageDto(message)),
      })
    } catch (e) {
      next(e)
    }
  }
}

export default new AppController()
