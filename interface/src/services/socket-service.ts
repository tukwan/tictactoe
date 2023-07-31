import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter"

export class SocketService {
  public socket: Socket | null = null

  connect(url: string): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
    return new Promise((rs, rj) => {
      this.socket = io(url)

      if (!this.socket) return rj()

      this.socket.on("connect", () => rs(this.socket!))

      this.socket.on("connect_error", (err) => rj(err))
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export default new SocketService()
