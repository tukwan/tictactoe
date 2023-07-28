import { useEffect, useState } from "react"

import gameService from "../services/game-service"
import mainService from "../services/main-service"

export function Game() {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isPlayerTurn, setPlayerTurn] = useState(false)
  const [matrix, setMatrix] = useState("")

  useEffect(() => {
    gameService.start(mainService.socket, (startConfig) => {
      // console.log("startConfig", startConfig)
      setGameStarted(true)
      setPlayerTurn(startConfig.start)
    })

    gameService.onReceivedUpdate(mainService.socket, (matrix: string) => {
      console.log("R_onReceivedUpdate:", matrix)
      setPlayerTurn(true)
    })
  }, [])

  const updateGameMatrix = (matrix: string) => {
    gameService.update(mainService.socket, matrix)
    setPlayerTurn(false)
  }

  const onMatrixChange = (e: React.ChangeEvent<any>) => {
    const matrix = e.target.value
    setMatrix(matrix)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    updateGameMatrix(matrix)
  }

  return (
    <>
      <h1>
        {isGameStarted ? "Game is on." : "Waiting for other players to join."}
      </h1>
      <h1>Your turn: {isPlayerTurn ? "yes" : "no"}</h1>
      <form className="mt-4" onSubmit={onSubmit}>
        <label>Matrix:</label>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2"
          onChange={onMatrixChange}
          value={matrix}
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
