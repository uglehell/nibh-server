import WebSocket from 'ws'
import { IWsMessage } from '../../ws-handlers/types'

export const sendToClients = (wsServer: WebSocket.Server, message: IWsMessage) => {
  wsServer.clients.forEach((client: WebSocket) => {
    client.send(JSON.stringify(message))
  })
}
