export const Layout = ({ children }) => (
  <div className="bg-white px-6 py-16 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-base font-semibold leading-7 text-indigo-600 ">
        Multiplayer game
      </p>
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Tic Tac Toe
      </h2>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  </div>
)
