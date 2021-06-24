import { ObjectId } from "mongoose"

export enum EWsMessageTypes {
  openMessage = 'open_message',
  homeClickMessage = 'home_click_message',
}

interface IOpenMessage {
  type: EWsMessageTypes.openMessage
  username: string
}

interface IHomeClickMessage {
  type: EWsMessageTypes.homeClickMessage
  lastClick: string
}

export type TWsMessage = IOpenMessage | IHomeClickMessage

interface IOnlineUser {
  username: string,
  id: ObjectId
}

export interface IOnlineUsersUpdateMessage {
  type: EWsRequestTypes.onlineUsersUpdate
  onlineUsers: IOnlineUser[]
}

export enum EWsRequestTypes {
  homeMessage = 'home_message',
  onlineUsersUpdate = 'online_users_update',
}

export interface IHomeMessage {
  type: EWsRequestTypes.homeMessage
  counter: number
  lastClick: string
}

export type TWsRequest = IHomeMessage | IOnlineUsersUpdateMessage
