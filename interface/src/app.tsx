import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { SOCKET_URL } from "./lib/config"
import { useSocket } from "./hooks/useSocket"
import { Room } from "./components/room"
import { Game } from "./components/game"
import { Layout } from "./components/layout"

export function App() {
  const [isPlayer, setIsPlayer] = useState(false)

  useSocket(SOCKET_URL)

  return (
    <>
      <Layout>
        {isPlayer ? <Game /> : <Room setIsPlayer={setIsPlayer} />}
      </Layout>
      <ToastContainer />
    </>
  )
}
