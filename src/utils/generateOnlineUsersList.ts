import { IUser } from '../models/user-model'

export const generateOnlineUsersList = (onlineUsers: IUser[]) => {
  return onlineUsers.map((user) => user.username)
}
