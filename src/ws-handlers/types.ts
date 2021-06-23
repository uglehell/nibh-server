export enum EWsMessageTypes {
  openMessage = 'open_message',
  onlineUsersUpdate = 'online_users_update'
}

export interface IOpenMessage {
  type: EWsMessageTypes.openMessage
  username: string
}

export interface IOnlineUsersUpdateMessage {
  type: EWsMessageTypes.onlineUsersUpdate,
  onlineUsers: string[]
}

export type TWsMessage = IOpenMessage | IOnlineUsersUpdateMessage
