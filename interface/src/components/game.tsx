import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import gameService from "../services/game-service"
import socketService from "../services/socket-service"
import { cn } from "../lib/utils"
import { checkWinning } from "../lib/winner"
import type { Matrix, PlayerSymbol } from "../lib/types"
import { Board, BoardRow, BoardCell } from "./board"

export function Game() {
  const [isGameStarted, setGameStarted] = useState(false)
  const [endGameMsg, setEndGameMsg] = useState("")
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
      setPlayerTurn(false)
      setEndGameMsg(msg)
    })
  }, [])

  if (isPlayerTurn) toast.success(`Your turn!`)

  const updateGameMatrix = (column: number, row: number) => {
    if (!isPlayerTurn) return

    if (matrix[column][row] !== null) return

    const newMatrix = [...matrix]
    newMatrix[column][row] = playerSymbol
    setMatrix(newMatrix)
    gameService.update(socketService.socket, newMatrix)

    const [currentPlayerWon, otherPlayerWon] = checkWinning(
      newMatrix,
      playerSymbol
    )

    if (currentPlayerWon && otherPlayerWon) {
      gameService.win(socketService.socket, "Is a TIE! 🤝")
      setEndGameMsg("Is a TIE! 🤝")
    } else if (currentPlayerWon && !otherPlayerWon) {
      gameService.win(socketService.socket, "You Lost! 😿")
      setEndGameMsg("You Won! 🥳")
    }

    setPlayerTurn(false)
  }

  if (!isGameStarted) return <GameLoading />

  return (
    <>
      <GameInfo
        playerSymbol={playerSymbol}
        isPlayerTurn={isPlayerTurn}
        endGameMsg={endGameMsg}
      />
      <Board>
        {matrix.map((row, rowIndex) => (
          <BoardRow key={rowIndex}>
            {row.map((symbol: PlayerSymbol, cellIndex) => (
              <BoardCell
                key={cellIndex}
                onClick={() => updateGameMatrix(rowIndex, cellIndex)}
                className={cn(!isPlayerTurn && "cursor-not-allowed opacity-50")}
              >
                {symbol}
              </BoardCell>
            ))}
          </BoardRow>
        ))}
      </Board>
    </>
  )
}

const GameLoading = () => (
  <>
    <div className="w-10 h-10 m-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
    <p className="text-md leading-8 text-gray-500 animate-pulse">
      Waiting for second player to join...
    </p>
  </>
)

const GameInfo = ({
  playerSymbol,
  isPlayerTurn,
  endGameMsg,
}: {
  playerSymbol: PlayerSymbol
  isPlayerTurn: boolean
  endGameMsg: string
}) => (
  <div className="mt-2 mb-3">
    <div className="text-md font-normal text-indigo-600">
      You: <span className="uppercase font-bold text-2xl">{playerSymbol}</span>
    </div>
    <div className="text-lg font-bold animate-pulse">
      {endGameMsg ? (
        <span className="text-indigo-600  text-3xl">{endGameMsg}</span>
      ) : (
        <span className={isPlayerTurn ? "text-green-600" : "text-red-600"}>
          {isPlayerTurn ? "Your turn... ⏳" : "Other player turn... ⏳"}
        </span>
      )}
    </div>
  </div>
)
