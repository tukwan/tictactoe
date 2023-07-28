import { Socket } from "socket.io"

import { io } from "../app"

export function GameController(socket: Socket) {
  socket.on("room_join", (roomId: string) => {
    console.log("New User joining room: ", roomId)

    const connectedSockets = io.sockets.adapter.rooms.get(roomId)

    const socketRooms = Array.from(socket.rooms.values()).filter(
      (roomId) => roomId !== socket.id
    )

    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("room_error", "Room is full")
      console.log("Error: ", "Room is full")
    } else {
      socket.join(roomId)
      socket.emit("room_joined")
      console.log("room_joined")

      if (io.sockets.adapter.rooms.get(roomId)?.size === 2) {
        socket.emit("start_game", { firstMove: true, symbol: "x" })
        socket.to(roomId).emit("start_game", { firstMove: false, symbol: "o" })
        console.log("start_game")
      }
    }
  })

  socket.on("update_game", (matrix: string) => {
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (roomId) => roomId !== socket.id
    )

    socket.to(socketRooms[0]).emit("on_received_update_game", matrix)
    console.log("S_update_game", matrix)
  })

  socket.on("win_game", (msg: string) => {
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (roomId) => roomId !== socket.id
    )

    socket.to(socketRooms[0]).emit("on_received_win_game", msg)
  })
}
