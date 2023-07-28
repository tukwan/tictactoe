import { Socket } from "socket.io-client"

class RoomService {
  public async joinRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("room_join", roomId)

      socket.on("room_joined", () => rs(true))
      socket.on("room_error", (error) => rj(error))
    })
  }
}

export default new RoomService()
