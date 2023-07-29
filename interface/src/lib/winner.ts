type PlayerSymbol = "x" | "o" | null
type Matrix = Array<Array<PlayerSymbol>>

export const checkWinning = (matrix: Matrix, playerSymbol: PlayerSymbol) => {
  // Check Rows & Columns
  for (let i = 0; i < 3; i++) {
    if (checkAllSame(matrix[i], playerSymbol)) return [true, false]
    if (checkAllSame([matrix[0][i], matrix[1][i], matrix[2][i]], playerSymbol))
      return [true, false]
  }

  // Check Diagonals
  if (checkAllSame([matrix[0][0], matrix[1][1], matrix[2][2]], playerSymbol))
    return [true, false]
  if (checkAllSame([matrix[2][0], matrix[1][1], matrix[0][2]], playerSymbol))
    return [true, false]

  // Check for a Tie
  if (matrix.every((m) => m.every((v) => v !== null))) {
    return [true, true]
  }

  return [false, false]
}

const checkAllSame = (array, value) => array.every((v) => v === value)
