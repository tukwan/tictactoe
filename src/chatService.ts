import { Socket } from "socket.io"

export function handleSocketConnection(socket: Socket) {
  console.log("User connected")

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })

  socket.on("message", (msg: string) => {
    console.log("Message received: ", msg)
    socket.broadcast.emit("message", msg)
  })
}
