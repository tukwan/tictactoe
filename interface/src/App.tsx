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
    <>
      <h1 className="text-3xl font-bold underline">TicTacToe</h1>
      <form className="mt-4" onSubmit={onSubmit}>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2"
          onChange={(e) => setMsg(e.target.value)}
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
