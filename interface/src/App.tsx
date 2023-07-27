import { useEffect, useState } from "react"

import { socket } from "./socket"

export function App() {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const onConnect = () => {
      console.log("onConnect")
    }

    const onDisconnect = () => {
      console.log("onDisconnect")
    }

    const onMessageEvent = (msg: string) => {
      console.log("onMessageEvent", msg)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("message", onMessageEvent)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("message", onMessageEvent)
      // socket.disconnect()
    }
  }, [])

  function onSubmit(event: any) {
    event.preventDefault()

    socket.emit("message", msg)
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setMsg(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  )
}
