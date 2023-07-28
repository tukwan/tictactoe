import { Socket } from "socket.io"

import { io } from "../index"

export function RoomController(socket: Socket) {
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
        socket.emit("start_game")
        console.log("start_game")
        // socket.to(roomId).emit("start_game", '')
      }
    }
  })
}
