import { Socket } from "socket.io"

import { io } from "../app"

type PlayerSymbol = "x" | "o" | null
type StartConfig = {
  firstMove: boolean
  playerSymbol: PlayerSymbol
}

export function GameController(socket: Socket) {
  const getSocketRooms = (): string[] =>
    Array.from(socket.rooms.values()).filter((roomId) => roomId !== socket.id)

  socket.on("room_join", (roomId: string) => {
    const connectedSockets = io.sockets.adapter.rooms.get(roomId)
    const socketRooms = getSocketRooms()

    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("room_error", "Room is full")
    } else {
      socket.join(roomId)
      socket.emit("room_joined")

      if (io.sockets.adapter.rooms.get(roomId)?.size === 2) {
        socket.emit("start_game", {
          firstMove: true,
          playerSymbol: "x",
        } as StartConfig)

        socket.to(roomId).emit("start_game", {
          firstMove: false,
          playerSymbol: "o",
        } as StartConfig)
      }
    }
  })

  socket.on("update_game", (gameState: string) => {
    const socketRooms = getSocketRooms()
    socket.to(socketRooms[0]).emit("on_received_update_game", gameState)
  })

  socket.on("win_game", (msg: string) => {
    const socketRooms = getSocketRooms()
    socket.to(socketRooms[0]).emit("on_received_win_game", msg)
  })
}
