import express from "express"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import { handleSocketConnection } from "./chatService"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, "../public")))

io.on("connection", handleSocketConnection)

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
