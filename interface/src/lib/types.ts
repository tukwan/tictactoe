export type PlayerSymbol = "x" | "o" | null

export type GameState = Array<Array<PlayerSymbol>>

export type StartConfig = {
  firstMove: boolean
  playerSymbol: PlayerSymbol
}
