import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"
import { decodeAuthJwt, getJwtSalt } from "../utils/decodeAuthJwt"

export async function createUserContext({ req }: CreateFastifyContextOptions) {
  const getUserFromHeader = async () => {
    const isSecureTokens = process.env.NODE_ENV === "production"
    const authorizationToken = req.headers.authorization?.split(" ")[1]
    const cookieToken = req.cookies[getJwtSalt(isSecureTokens)];
    const token = cookieToken || authorizationToken;

    if (!!token) {
      const user = await decodeAuthJwt(token, isSecureTokens)

      return user
    }

    return null
  }

  const user = await getUserFromHeader()

  return {
    user: user,
  }
}