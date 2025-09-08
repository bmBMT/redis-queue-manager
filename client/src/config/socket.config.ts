import { IOEvents } from "@redis-queue-manager/shared"
import { io, Socket } from "socket.io-client"

export const socket: Socket<IOEvents> = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: false,
})
