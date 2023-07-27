import express from "express"
import cors from "cors"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import { handleSocketConnection } from "./chatService"

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", handleSocketConnection)

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
