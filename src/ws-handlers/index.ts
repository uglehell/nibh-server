import { Server } from 'ws'
import ChatHandler from './chat-handler'
import HomeHandler from './home-handler'
import OnlineUsersHandler from './online-users-handler'
import { TWsMessage } from './types'

export default (wss: Server) => (ws: WebSocket) => {
  const homeHandler = new HomeHandler(wss)
  const chatHandler = new ChatHandler(wss)
  const onlineUsersHandler = new OnlineUsersHandler(wss)

  ws.onmessage = async (event: MessageEvent) => {
    const message = JSON.parse(event.data) as TWsMessage

    await homeHandler.onMessage(message)
    await chatHandler.onMessage(message)
    await onlineUsersHandler.onMessage(message)
  }

  ws.onclose = async (event: CloseEvent) => {
    await onlineUsersHandler.onClose(event)
  }

  ws.onerror = async (event: Event) => {
    await onlineUsersHandler.onError(event)
  }
}
