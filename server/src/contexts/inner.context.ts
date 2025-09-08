import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"
import { createServerContext } from './server.context'
import { createUserContext } from './user.context';

export async function createInnerContext(opts: CreateFastifyContextOptions) {
  const serverContext = await createServerContext(opts);
	const userContext = await createUserContext(opts);

	return {
		...serverContext,
		...userContext
  }
}

export type InnerContext = Awaited<ReturnType<typeof createInnerContext>>
