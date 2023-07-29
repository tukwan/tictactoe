import { useEffect, useState } from "react"

import mainService from "./services/socket-service"
import { Room } from "./components/room"
import { Game } from "./components/game"
import { Layout } from "./components/layout"

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
    <Layout>{isPlayer ? <Game /> : <Room setIsPlayer={setIsPlayer} />}</Layout>
  )
}
