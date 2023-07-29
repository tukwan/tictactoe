import { useEffect, useState } from "react"

import gameService from "../services/game-service"
import socketService from "../services/socket-service"
import { cn } from "../lib/utils"
import { checkWinning } from "../lib/winner"
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
    const newMatrix = [...matrix]

    if (matrix[column][row] === null) {
      newMatrix[column][row] = playerSymbol
      setMatrix(newMatrix)
    }

    gameService.update(socketService.socket, newMatrix)

    const [currentPlayerWon, otherPlayerWon] = checkWinning(
      newMatrix,
      playerSymbol
    )

    if (currentPlayerWon && otherPlayerWon) {
      gameService.win(socketService.socket, "The Game is a TIE!")
      alert("The Game is a TIE!")
    } else if (currentPlayerWon && !otherPlayerWon) {
      gameService.win(socketService.socket, "You Lost!")
      alert("You Won!")
    }

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
