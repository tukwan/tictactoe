const isProd = import.meta.env.MODE === "production"
const socketProd = window.location.origin
const socketDev = "http://localhost:3000"
export const SOCKET_URL = isProd ? socketProd : socketDev
