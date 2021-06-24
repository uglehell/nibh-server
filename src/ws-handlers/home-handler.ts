import WebSocket, { OpenEvent } from 'ws'
import { sendToClients } from '../services/ws-service/sendToClients'
import { EWsMessageTypes, EWsRequestTypes, IHomeMessage, TWsMessage } from './types'

export default class HomeHandler {
  private counter = 0
  private lastClick = ''

  constructor(private wsServer: WebSocket.Server, private ws: WebSocket) {}

  onMessage = async (message: TWsMessage) => {
    switch (message.type) {
      case EWsMessageTypes.homeClickMessage:
        this.lastClick = message.lastClick

        const response: IHomeMessage = {
          type: EWsRequestTypes.homeMessage,
          counter: ++this.counter,
          lastClick: this.lastClick
        }

        sendToClients(this.wsServer, response)
    }
  }

  onOpen = () => {
    const message: IHomeMessage = {
      type: EWsRequestTypes.homeMessage,
      counter: this.counter,
      lastClick: this.lastClick,
    }

    this.ws.send(JSON.stringify(message))
  }
}
