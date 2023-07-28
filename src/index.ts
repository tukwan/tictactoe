import express from "express"
import cors from "cors"
import path from "path"
import http from "http"
import { Server, Socket } from "socket.io"

import { MainController } from "./controllers/main-controller"
import { RoomController } from "./controllers/room-controller"
import { GameController } from "./controllers/game-controller"

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", (socket: Socket) => {
  MainController(socket)
  RoomController(socket)
  GameController(socket)
})

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
