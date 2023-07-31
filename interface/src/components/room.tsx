import { useState } from "react"
import { toast } from "react-toastify"

import gameService from "../services/game-service"

export function Room() {
  const [roomId, setRoomId] = useState("")
  const [joinedRoom, setJoinedRoom] = useState(false)

  const onRoomIdChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value
    setRoomId(value)
  }

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!roomId || roomId.trim() === "") return

    try {
      const joined = await gameService.joinRoom(roomId)
      setJoinedRoom(joined)
      toast.success(`You joined Room: ${roomId}`)
    } catch (error) {
      toast.error(`Error joining a Room: ${roomId}`)
      toast.error(`${error}`)
    }
  }

  return (
    <>
      {joinedRoom ? (
        <>
          <div className="w-10 h-10 m-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
          <p className="text-md leading-8 text-gray-500 animate-pulse">
            Waiting for second player to join...
          </p>
        </>
      ) : (
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
      )}
    </>
  )
}
