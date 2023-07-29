import { useEffect, useState } from "react"

import gameService from "../services/game-service"
import socketService from "../services/socket-service"
import { cn } from "../lib/utils"
import { Board, BoardRow, BoardCell } from "./board"

type PlayerSymbol = "x" | "o" | null
export type Matrix = Array<Array<PlayerSymbol>>

export function Game() {
  const [isGameStarted, setGameStarted] = useState(false)
  const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(null)
  const [isPlayerTurn, setPlayerTurn] = useState(false)
  const [matrix, setMatrix] = useState<Matrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  useEffect(() => {
    gameService.start(socketService.socket, (startConfig) => {
      setGameStarted(true)
      setPlayerSymbol(startConfig.playerSymbol)
      setPlayerTurn(startConfig.firstMove)
    })

    gameService.onReceivedUpdate(socketService.socket, (newMatrix) => {
      setMatrix(newMatrix)
      // check if win
      setPlayerTurn(true)
    })

    gameService.onReceivedWin(socketService.socket, (msg: string) => {
      console.log("R_onReceivedWin:", msg)
      alert(msg)
      setPlayerTurn(false)
    })
  }, [])

  const updateGameMatrix = (column: number, row: number) => {
    if (!isPlayerTurn) return

    if (matrix[column][row] === null) {
      const newMatrix = [...matrix]
      newMatrix[column][row] = playerSymbol
      setMatrix(newMatrix)
    }

    gameService.update(socketService.socket, matrix)

    // if (matrix === "0") {
    //   gameService.win(socketService.socket, "You lost!")
    //   alert("You won!")
    // }

    setPlayerTurn(false)
  }

  return (
    <>
      <h1>
        {isGameStarted ? "Game is on." : "Waiting for other players to join."}
      </h1>
      {isGameStarted && (
        <>
          <h1>Your turn: {isPlayerTurn ? "yes" : "no"}</h1>
          <h1>Your symbol: {playerSymbol}</h1>
          <Board>
            {matrix.map((row, rowIndex) => (
              <BoardRow key={rowIndex}>
                {row.map((symbol: PlayerSymbol, cellIndex) => (
                  <BoardCell
                    key={cellIndex}
                    onClick={() => updateGameMatrix(rowIndex, cellIndex)}
                    className={cn(
                      !isPlayerTurn && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {symbol}
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
