import WebSocket from 'ws'
import { TWsMessage } from './types'

export default class ChatHandler {
  constructor(private wsServer: WebSocket.Server) {}

  onMessage = async (message: TWsMessage) => {
    switch (message.type) {
    }
  }
}
