# Tic Tac Toe - multiplayer game

A real-time, multiplayer Tic Tac Toe game built using Node.js for the server-side, and React for the client-side interface.

## Live Preview

You can play the game online at [https://tic-tac-toe-09qb.onrender.com](https://tic-tac-toe-09qb.onrender.com) .

## Features

- Interactive multiplayer gameplay in real-time.
- Game lobby for players waiting to join a game.
- Built using modern technologies.

## Tech Stack

- **[Node.js](https://nodejs.org/en/)**: Back-end JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)**: Minimal Node.js web application framework.
- **[Socket.IO](https://socket.io/)**: Library enabling real-time, bidirectional communication.
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Statically typed JavaScript superset.
- **[Vite](https://vitejs.dev/)**: Modern and fast build tool.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[Cypress](https://www.cypress.io/)**: Next-gen front end testing tool.
- **[Vitest](https://vitest.dev/)**: Unit test framework for the Vite ecosystem.
- **[ESLint](https://eslint.org/)**: Tool for identifying and reporting on JavaScript patterns.
- **[GitHub Actions](https://github.com/features/actions)**: Workflow automation tool for software development.

## Project Structure

This project is structured into two main directories:

1. `./`: Contains the server-side of the application, which uses Node.js and Socket.IO to facilitate real-time communication between the players.

2. `./interface`: Contains the client-side of the application, built with React, which communicates with the server via Socket.IO.

## Local Development

To start the server-side development from the root directory, execute:

`npm run dev`

In a new terminal window, navigate to the `./interface` directory and initiate the client-side development server:

`cd ./interface && npm run dev`

Navigate to: `http://localhost:5173`

## Testing

To run the unit and integration tests:

`cd ./interface && npm run test`

End-to-end tests can be executed with the following command, but ensure the server and client are up and running:

`cd ./interface && npm run test:e2e`

## Building for Production

You can generate production-ready builds of the server and client using:

`npm run build:prod`

This command will take care of installing dependencies, and building both server-side and client-side applications.

To launch the production build:

`npm run start`

Navigate to: `http://localhost:10000`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
