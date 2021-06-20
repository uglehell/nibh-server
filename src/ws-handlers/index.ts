import { Server } from 'ws'
import chatHandler from './chat-handler'
import homeHandler from './home-handler'
import usersHandler from './users-handler'

export default (wss: Server) => (ws: WebSocket) => {
  homeHandler(ws, wss)
  chatHandler(ws, wss)
  usersHandler(ws, wss)
}
