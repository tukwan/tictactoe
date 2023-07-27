import { Socket } from "socket.io"

export function handleSocketConnection(socket: Socket) {
  console.log("User connected: ", socket.id)

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })

  socket.on("message", (msg: string) => {
    console.log("Message received: ", msg)
    socket.emit("message", msg)
  })
}
