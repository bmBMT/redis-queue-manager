import { getCookie } from "cookies-next"
import { AuthJwtNameEnum } from "@redis-queue-manager/shared"

const getAuthHeaders = async () => {
  const isSecureTokens = process.env.NODE_ENV === "production"
  const tokenName = isSecureTokens ? AuthJwtNameEnum.SECURE_NAME : AuthJwtNameEnum.DEFAULT_NAME
  let token

  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers")
    token = (await cookies()).get(tokenName)?.value
  } else token = await getCookie(tokenName)

  return {
    authorization: `Bearer ${token}`,
  }
}

export default getAuthHeaders
