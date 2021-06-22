export enum EWsMessageTypes {
  openMessage = 'open_message'
}

export interface IWsMessage {
  type: string,
  [key: string]: any
}