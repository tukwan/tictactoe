import { Socket } from "socket.io-client"

import { Matrix, StartConfig } from "../lib/types"

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

  public async update(socket: Socket, matrix: Matrix) {
    socket.emit("update_game", matrix)
  }

  public async onReceivedUpdate(
    socket: Socket,
    callback: (matrix: Matrix) => void
  ) {
    socket.on("on_received_update_game", (matrix) => callback(matrix))
  }

  public async win(socket: Socket, msg: string) {
    socket.emit("win_game", msg)
  }

  public async onReceivedWin(socket: Socket, callback: (msg) => void) {
    socket.on("on_received_win_game", (msg) => callback(msg))
  }
}

export default new GameService()
