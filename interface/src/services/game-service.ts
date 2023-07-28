import { Socket } from "socket.io-client"

interface StartConfig {
  start: boolean
  symbol: "x" | "o"
}

class GameService {
  public async start(
    socket: Socket,
    callback: (startConfig: StartConfig) => void
  ) {
    socket.on("start_game", callback)
  }

  public async update(socket: Socket, matrix: string) {
    socket.emit("update_game", matrix)
  }

  public async onReceivedUpdate(socket: Socket, callback: (matrix) => void) {
    socket.on("on_received_update_game", (matrix) => callback(matrix))
  }
}

export default new GameService()
