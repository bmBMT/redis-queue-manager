import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"

export async function createServerContext({ req }: CreateFastifyContextOptions) {
  return {
    server: req.server,
  }
}
