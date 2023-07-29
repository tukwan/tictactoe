import { useEffect, useState } from "react"

import gameService from "../services/game-service"
import socketService from "../services/socket-service"
import { Board, BoardRow, BoardCell } from "./board"

export function Game() {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isPlayerTurn, setPlayerTurn] = useState(false)
  const [matrix, setMatrix] = useState([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ])

  useEffect(() => {
    gameService.start(socketService.socket, (startConfig) => {
      console.log("startConfig", startConfig)
      setGameStarted(true)
      setPlayerTurn(startConfig.firstMove)
    })

    gameService.onReceivedUpdate(socketService.socket, (matrix: string) => {
      console.log("R_onReceivedUpdate:", matrix)
      setPlayerTurn(true)
    })

    gameService.onReceivedWin(socketService.socket, (msg: string) => {
      console.log("R_onReceivedWin:", msg)
      alert(msg)
      setPlayerTurn(false)
    })
  }, [])

  const updateGameMatrix = (matrix: string) => {
    gameService.update(socketService.socket, matrix)

    if (matrix === "0") {
      gameService.win(socketService.socket, "You lost!")
      alert("You won!")
    }

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
      {isGameStarted && (
        <>
          <h1>Your turn: {isPlayerTurn ? "yes" : "no"}</h1>

          <form className="mt-4" onSubmit={onSubmit}>
            <label>Matrix:</label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2"
              onChange={onMatrixChange}
              value={matrix}
            />
            <button
              className={`ml-2 px-4 py-2 rounded-lg text-white ${
                !isPlayerTurn ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
              }`}
              type="submit"
              disabled={!isPlayerTurn}
            >
              Send
            </button>
          </form>
          <Board>
            {matrix.map((row, rowIndex) => (
              <BoardRow key={rowIndex}>
                {row.map((value, cellIndex) => (
                  <BoardCell key={cellIndex} onClick={() => alert("yo")}>
                    {value}
                  </BoardCell>
                ))}
              </BoardRow>
            ))}
          </Board>
        </>
      )}
    </>
  )
}
