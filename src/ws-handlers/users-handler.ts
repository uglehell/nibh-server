import { Server } from "ws";
import { sendToClients } from "../services/wsActions/sendToClients";
import { EWsMessageTypes, IWsMessage } from "./types";

export default (ws: WebSocket, wsServer: Server) => {
  ws.onmessage = (event: MessageEvent<IWsMessage>) => {

    console.log(event)
    sendToClients(wsServer, event.data)
  }
}
