import { initTRPC, TRPCError } from "@trpc/server"
import loggingMiddleware from "../middleware/logging.middleware"
import ServerErrors from "../common/errors"
import { prisma } from "@redis-queue-manager/prisma"
import { InnerContext } from '../contexts/inner.context'

const t = initTRPC.context<InnerContext>().create()

export const middleware = t.middleware

const authMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ServerErrors.AUTH_TOKEN_PAYLOAD_USER_ID_MISSING,
    })
  }

  const existUser = await prisma.user.findFirst({
    where: { id: ctx.user.sub },
  })

  if (!existUser) throw new TRPCError({
    code: 'NOT_FOUND',
    message: ServerErrors.USER_NOT_FOUND
  })

  return next({ ctx })
})

export const router = t.router
export const procedure = t.procedure.use(loggingMiddleware).use(authMiddleware)
