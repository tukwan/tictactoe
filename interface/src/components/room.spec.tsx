import { render, fireEvent, waitFor, cleanup } from "@testing-library/react"
import { vi, expect, Mock } from "vitest"
import { act } from "react-dom/test-utils"
import { toast } from "react-toastify"
import matchers from "@testing-library/jest-dom/matchers"

import { Room } from "./room"
import gameService from "../services/game-service"

expect.extend(matchers)

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("Room", () => {
  beforeEach(() => {
    gameService.joinRoom = vi.fn()
    vi.clearAllMocks()
  })

  afterEach(cleanup)

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Room />)

    expect(getByPlaceholderText("Room id...")).toBeInTheDocument()
    expect(getByText("Join")).toBeInTheDocument()
  })

  it("should not call joinRoom when form is submitted with empty input", async () => {
    const { getByText } = render(<Room />)

    fireEvent.click(getByText("Join"))

    expect(gameService.joinRoom).not.toHaveBeenCalled()
  })

  it("should call joinRoom when form is submitted with room id", async () => {
    (gameService.joinRoom as Mock).mockResolvedValueOnce(true)

    const { getByText, getByPlaceholderText } = render(<Room />)

    fireEvent.change(getByPlaceholderText("Room id..."), {
      target: { value: "room-id-1" },
    })

    await act(async () => {
      fireEvent.click(getByText("Join"))
    })

    await waitFor(() => {
      expect(gameService.joinRoom).toHaveBeenCalledWith("room-id-1")
      expect(toast.success).toHaveBeenCalledWith("You joined Room: room-id-1")
    })
  })

  it("should handle joinRoom error", async () => {
    const error = new Error("Network error")
    ;(gameService.joinRoom as Mock).mockRejectedValueOnce(error)

    const { getByText, getByPlaceholderText } = render(<Room />)

    fireEvent.change(getByPlaceholderText("Room id..."), {
      target: { value: "room-id-1" },
    })

    await act(async () => {
      fireEvent.click(getByText("Join"))
    })

    await waitFor(() => {
      expect(gameService.joinRoom).toHaveBeenCalledWith("room-id-1")
      expect(toast.error).toHaveBeenCalledWith(
        `Error joining a Room: room-id-1`
      )
      expect(toast.error).toHaveBeenCalledWith(`${error}`)
    })
  })
})
