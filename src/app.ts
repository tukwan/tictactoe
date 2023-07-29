import express from "express"
import cors from "cors"
import path from "path"
import http from "http"
import { Server, Socket } from "socket.io"
import "dotenv/config"

import { SocketController } from "./controllers/socket-controller"
import { GameController } from "./controllers/game-controller"

const PORT = process.env.PORT || 3000
const PORT_CLIENT = process.env.PORT || 5173
const CLIENT_URL = `http://localhost:${PORT_CLIENT}`

console.log('CLIENT_URL ', CLIENT_URL)


const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "../interface/dist")))

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
})

io.on("connection", (socket: Socket) => {
  SocketController(socket)
  GameController(socket)
})

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
