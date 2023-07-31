import { Socket } from "socket.io"

export function SocketController(socket: Socket) {
  console.log("connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id)
  })
}
