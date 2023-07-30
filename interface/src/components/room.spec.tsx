import { render, fireEvent } from "@testing-library/react"
import { vi, expect } from "vitest"
import { act } from "react-dom/test-utils"
import matchers from "@testing-library/jest-dom/matchers"

import { Room } from "./room"
import gameService from "../services/game-service"
import socketService from "../services/socket-service"

expect.extend(matchers)

const mockSetIsPlayer = vi.fn()

describe("Room", () => {
  beforeEach(() => {
    socketService.socket = "socket"
    gameService.joinRoom = vi.fn()
  })

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Room setIsPlayer={mockSetIsPlayer} />
    )

    expect(getByPlaceholderText("Room id...")).toBeInTheDocument()
    expect(getByText("Join")).toBeInTheDocument()
  })

  it("should not call joinRoom when form is submitted with empty input", async () => {
    const { getByText } = render(<Room setIsPlayer={mockSetIsPlayer} />)

    fireEvent.click(getByText("Join"))

    expect(gameService.joinRoom).not.toHaveBeenCalled()
  })

  it("should call joinRoom when form is submitted with room id", async () => {
    gameService.joinRoom.mockResolvedValueOnce(true)

    const { getByText, getByPlaceholderText } = render(
      <Room setIsPlayer={mockSetIsPlayer} />
    )

    fireEvent.change(getByPlaceholderText("Room id..."), {
      target: { value: "room-id-1" },
    })

    await act(async () => {
      fireEvent.click(getByText("Join"))
    })

    expect(gameService.joinRoom).toHaveBeenCalled()
    expect(mockSetIsPlayer).toHaveBeenCalledWith(true)
  })

  it("should handle joinRoom error", async () => {
    // TODO:
  })
})
