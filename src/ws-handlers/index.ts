import chatHandler from "./chat-handler"
import homeHandler from "./home-handler"
import onlineHandler from "./online-handler"

export default (ws: WebSocket) => {
  homeHandler(ws)
  chatHandler(ws)
  onlineHandler(ws)
}