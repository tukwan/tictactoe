import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import socketService from "../services/socket-service"
import gameService from "../services/game-service"

export const useSocket = (socketUrl: string) => {
  const [isConnected, setConnected] = useState(false)

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const socket = await socketService.connect(socketUrl)
        await gameService.connect(socket)
        setConnected(socket.connected)
      } catch (error) {
        toast.error("WebSocket connection error.")
      }
    }
    connectSocket()

    return () => {
      gameService.disconnect()
      socketService.disconnect()
    }
  }, [socketUrl])

  return { isConnected }
}
