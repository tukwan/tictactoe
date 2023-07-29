import { describe, expect, it } from "vitest"

import { checkWinning } from "./winner"
import type { Matrix } from "../lib/types"

describe("checkWinning", () => {
  it('should return [true, false] when player "x" wins on a row', () => {
    const matrix: Matrix = [
      ["x", "x", "x"],
      ["o", null, null],
      [null, "o", "o"],
    ]
    expect(checkWinning(matrix, "x")).toEqual([true, false])
  })

  it('should return [true, false] when player "o" wins on a column', () => {
    const matrix: Matrix = [
      ["o", "x", null],
      ["o", null, "x"],
      ["o", "x", null],
    ]
    expect(checkWinning(matrix, "o")).toEqual([true, false])
  })

  it('should return [true, false] when player "x" wins on a diagonal', () => {
    const matrix: Matrix = [
      ["x", null, "o"],
      ["o", "x", null],
      ["o", null, "x"],
    ]
    expect(checkWinning(matrix, "x")).toEqual([true, false])
  })

  it('should return [true, false] when player "o" wins on a other diagonal', () => {
    const matrix: Matrix = [
      ["x", null, "o"],
      ["x", "o", null],
      ["o", null, "x"],
    ]
    expect(checkWinning(matrix, "o")).toEqual([true, false])
  })

  it("should return [true, true] when the game is a tie", () => {
    const matrix: Matrix = [
      ["x", "o", "x"],
      ["x", "x", "o"],
      ["o", "x", "o"],
    ]
    expect(checkWinning(matrix, "x")).toEqual([true, true])
  })

  it("should return [false, false] when the game is not finished", () => {
    const matrix: Matrix = [
      ["x", null, "o"],
      ["o", "x", "x"],
      ["x", "o", null],
    ]
    expect(checkWinning(matrix, "x")).toEqual([false, false])
    expect(checkWinning(matrix, "o")).toEqual([false, false])
  })
})
