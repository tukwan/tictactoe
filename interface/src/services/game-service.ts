import { Socket } from "socket.io-client"

import { GameState, StartConfig } from "../lib/types"

export class GameService {
  private socket: Socket | null = null

  connect(socket: Socket) {
    this.socket = socket
  }

  async joinRoom(roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      this.socket?.emit("room_join", roomId)
      this.socket?.on("room_joined", () => rs(true))
      this.socket?.on("room_error", (error) => rj(error))
    })
  }

  async start(callback: (startConfig: StartConfig) => void) {
    this.socket?.on("start_game", callback)
  }

  async update(gameState: GameState) {
    this.socket?.emit("update_game", gameState)
  }

  async onReceivedUpdate(callback: (gameState: GameState) => void) {
    this.socket?.on("on_received_update_game", (gameState) =>
      callback(gameState)
    )
  }

  async win(msg: string) {
    this.socket?.emit("win_game", msg)
  }

  async onReceivedWin(callback: (msg) => void) {
    this.socket?.on("on_received_win_game", (msg) => callback(msg))
  }

  disconnect() {
    if (this.socket) {
      this.socket.off("room_joined")
      this.socket.off("room_error")
      this.socket.off("start_game")
      this.socket.off("on_received_update_game")
      this.socket.off("on_received_win_game")
    }
  }
}

export default new GameService()
