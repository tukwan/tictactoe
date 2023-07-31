import type { GameState, PlayerSymbol } from "../lib/types"

export const checkWinning = (gameState: GameState, playerSymbol: PlayerSymbol) => {
  // Check Rows & Columns
  for (let i = 0; i < 3; i++) {
    if (checkAllSame(gameState[i], playerSymbol)) return [true, false]
    if (checkAllSame([gameState[0][i], gameState[1][i], gameState[2][i]], playerSymbol))
      return [true, false]
  }

  // Check Diagonals
  if (checkAllSame([gameState[0][0], gameState[1][1], gameState[2][2]], playerSymbol))
    return [true, false]
  if (checkAllSame([gameState[2][0], gameState[1][1], gameState[0][2]], playerSymbol))
    return [true, false]

  // Check for a Tie
  if (gameState.every((m) => m.every((v) => v !== null))) {
    return [true, true]
  }

  return [false, false]
}

const checkAllSame = (array, value) => array.every((v) => v === value)
