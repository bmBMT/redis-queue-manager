import { initTRPC } from "@trpc/server"
const t = initTRPC.create()
export default t


export const publicProcedure = t.procedure
export const router = t.router
