import { describe, expect, it } from "vitest"

import { checkWinning } from "./winner"
import type { GameState } from "../lib/types"

describe("checkWinning", () => {
  it('should return [true, false] when player "x" wins on a row', () => {
    const gameState: GameState = [
      ["x", "x", "x"],
      ["o", null, null],
      [null, "o", "o"],
    ]
    expect(checkWinning(gameState, "x")).toEqual([true, false])
  })

  it('should return [true, false] when player "o" wins on a column', () => {
    const gameState: GameState = [
      ["o", "x", null],
      ["o", null, "x"],
      ["o", "x", null],
    ]
    expect(checkWinning(gameState, "o")).toEqual([true, false])
  })

  it('should return [true, false] when player "x" wins on a diagonal', () => {
    const gameState: GameState = [
      ["x", null, "o"],
      ["o", "x", null],
      ["o", null, "x"],
    ]
    expect(checkWinning(gameState, "x")).toEqual([true, false])
  })

  it('should return [true, false] when player "o" wins on a other diagonal', () => {
    const gameState: GameState = [
      ["x", null, "o"],
      ["x", "o", null],
      ["o", null, "x"],
    ]
    expect(checkWinning(gameState, "o")).toEqual([true, false])
  })

  it("should return [true, true] when the game is a tie", () => {
    const gameState: GameState = [
      ["x", "o", "x"],
      ["x", "x", "o"],
      ["o", "x", "o"],
    ]
    expect(checkWinning(gameState, "x")).toEqual([true, true])
  })

  it("should return [false, false] when the game is not finished", () => {
    const gameState: GameState = [
      ["x", null, "o"],
      ["o", "x", "x"],
      ["x", "o", null],
    ]
    expect(checkWinning(gameState, "x")).toEqual([false, false])
    expect(checkWinning(gameState, "o")).toEqual([false, false])
  })
})
