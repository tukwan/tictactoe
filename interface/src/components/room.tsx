import { useState } from "react"

import socketService from "../services/socket-service"
import gameService from "../services/game-service"

interface RoomProps {
  setIsPlayer: (isPlayer: boolean) => void
}

export function Room({ setIsPlayer }: RoomProps) {
  const [roomId, setRoomId] = useState("")

  const onRoomIdChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value
    setRoomId(value)
  }

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault()

    const socket = socketService.socket
    if (!roomId || roomId.trim() === "" || !socket) return

    try {
      const joined = await gameService.joinRoom(socket, roomId)
      if (joined) setIsPlayer(true)
    } catch (error) {
      console.log("Error gameService:", error)
    }
  }

  return (
    <form className="mt-4" onSubmit={joinRoom}>
      <input
        type="text"
        name="room"
        id="room"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
        onChange={onRoomIdChange}
        placeholder="Room id..."
      />
      <button
        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-900 transition duration-200"
        type="submit"
      >
        Join
      </button>
    </form>
  )
}
