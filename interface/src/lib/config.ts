const isProd = import.meta.env.MODE === "production"
const socketProd = import.meta.env.VITE_SOCKET_PROD
const socketDev = import.meta.env.VITE_SOCKET_DEV
export const SOCKET_URL = isProd ? socketProd : socketDev
