import { Socket } from "socket.io-client"

interface StartConfig {
  firstMove: boolean
  symbol: "x" | "o"
}

class GameService {
  public async joinRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("room_join", roomId)

      socket.on("room_joined", () => rs(true))
      socket.on("room_error", (error) => rj(error))
    })
  }

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
