export const Board = ({ board }) => (
  <div className="grid gap-4 p-6 bg-gray-100 rounded-md shadow-md w-full max-w-md mx-auto ">
    {board.map((row, i) => (
      <Row key={i} values={row} />
    ))}
  </div>
)

export const Row = ({ values }) => (
  <div className="grid grid-cols-3 gap-4">
    {values.map((value, i) => (
      <Cell key={i} value={value} />
    ))}
  </div>
)

export const Cell = ({ value }) => (
  <div className="flex items-center justify-center bg-white hover:bg-gray-300 transition duration-300 ease-in-out border-2 border-gray-200 rounded-lg shadow-lg h-24 cursor-pointer">
    <span className="text-4xl font-bold text-gray-900">{value}</span>
  </div>
)

export const board = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", "O", "X"],
]
