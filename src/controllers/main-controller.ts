import { Socket } from "socket.io"

export function MainController(socket: Socket) {
  console.log("User connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
}
