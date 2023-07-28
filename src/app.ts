import express from "express"
import cors from "cors"
import path from "path"
import http from "http"
import { Server, Socket } from "socket.io"

import { SocketController } from "./controllers/socket-controller"
import { GameController } from "./controllers/game-controller"

const CLIENT_APP_URL = "http://localhost:5173"
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: CLIENT_APP_URL,
  },
})

io.on("connection", (socket: Socket) => {
  SocketController(socket)
  GameController(socket)
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
