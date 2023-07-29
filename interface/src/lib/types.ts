export type PlayerSymbol = "x" | "o" | null

export type Matrix = Array<Array<PlayerSymbol>>

export type StartConfig = {
  firstMove: boolean
  playerSymbol: PlayerSymbol
}
