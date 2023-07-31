import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { SOCKET_URL } from "./lib/config"
import mainService from "./services/socket-service"
import { Room } from "./components/room"
import { Game } from "./components/game"
import { Layout } from "./components/layout"

export function App() {
  const [isPlayer, setIsPlayer] = useState(false)

  useEffect(() => {
    const connectSocket = async () => {
      try {
        await mainService.connect(SOCKET_URL)
        console.log("connected")
      } catch (error) {
        console.log("Error mainService: ", error)
      }
    }

    connectSocket()
  }, [])

  return (
    <>
      <Layout>
        {isPlayer ? <Game /> : <Room setIsPlayer={setIsPlayer} />}
      </Layout>
      <ToastContainer />
    </>
  )
}
