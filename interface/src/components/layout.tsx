export const Layout = ({ children }) => (
  <div className="mx-auto mt-16 text-center">
    <p className="text-base font-semibold leading-7 text-indigo-600 ">
      Multiplayer game
    </p>
    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Tic Tac Toe
    </h2>
    <div className="flex flex-col items-center">{children}</div>
  </div>
)
