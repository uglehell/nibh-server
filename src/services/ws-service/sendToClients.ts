import WebSocket from 'ws'
import { TWsMessage } from '../../ws-handlers/types'

export const sendToClients = (wsServer: WebSocket.Server, message: TWsMessage) => {
  wsServer.clients.forEach((client: WebSocket) => {
    client.send(JSON.stringify(message))
  })
}
