import { cn } from "../lib/utils"

export const Board = ({ children }) => (
  <div className="grid gap-4 p-6 bg-gray-100 rounded-md shadow-md w-full max-w-md mx-auto">
    {children}
  </div>
)

export const BoardRow = ({ children }) => (
  <div className="grid grid-cols-3 gap-4">{children}</div>
)

export const BoardCell = ({ children, onClick, className }) => (
  <div
    className={cn(
      "flex items-center justify-center bg-white hover:bg-gray-300 transition duration-300 ease-in-out border-2 border-gray-200 rounded-lg shadow-lg h-24 cursor-pointer",
      className
    )}
    onClick={onClick}
  >
    <span className="text-4xl uppercase font-bold text-gray-900">
      {children}
    </span>
  </div>
)
