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
      console.log("room_joined:", joined)
      if (joined) setIsPlayer(true)
    } catch (error) {
      console.log("Error gameService:", error)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">TicTacToe</h1>
      <form className="mt-4" onSubmit={joinRoom}>
        <label>Join a room</label>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2"
          onChange={onRoomIdChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  )
}
