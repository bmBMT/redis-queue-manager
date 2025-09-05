import { initTRPC } from "@trpc/server"
import loggingMiddleware from '../middleware/logging.middleware'
const t = initTRPC.create()
export default t

export const middleware = t.middleware
export const router = t.router
export const procedure = t.procedure.use(loggingMiddleware)
