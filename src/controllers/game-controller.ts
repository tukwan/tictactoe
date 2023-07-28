import { Socket } from "socket.io"

export function GameController(socket: Socket) {
  socket.on("update_game", (matrix: string) => {
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (roomId) => roomId !== socket.id
    )

    socket.to(socketRooms[0]).emit("on_received_update_game", matrix)
    console.log("S_update_game", matrix)
  })
}
