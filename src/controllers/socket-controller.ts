import { Socket } from "socket.io"

export function SocketController(socket: Socket) {
  console.log("Player connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id)
  })
}
