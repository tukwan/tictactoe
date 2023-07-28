import { useEffect, useState } from "react"

import mainService from "./services/main-service"
import { Room } from "./components/room"
import { Game } from "./components/game"

const SOCKET_ENDPOINT = "http://localhost:3000"

export function App() {
  const [isPlayer, setIsPlayer] = useState(false)

  useEffect(() => {
    const connectSocket = async () => {
      try {
        await mainService.connect(SOCKET_ENDPOINT)
        console.log("connected")
      } catch (error) {
        console.log("Error mainService: ", error)
      }
    }

    connectSocket()
  }, [])

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {isPlayer ? <Game /> : <Room setIsPlayer={setIsPlayer} />}
    </>
  )
}
