import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { SOCKET_URL } from "./lib/config"
import { useSocket } from "./hooks/useSocket"
import { Layout } from "./components/layout"
import { Room } from "./components/room"
import { Game } from "./components/game"

export function App() {
  const [isGameStarted, setGameStarted] = useState(false)
  const { isConnected } = useSocket(SOCKET_URL)

  return (
    <>
      <Layout>
        {isConnected && (
          <>
            {!isGameStarted && <Room />}
            <Game
              setGameStarted={setGameStarted}
              isGameStarted={isGameStarted}
            />
          </>
        )}
      </Layout>
      <ToastContainer />
    </>
  )
}
