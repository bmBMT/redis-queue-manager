import { AuthJwtNameEnum } from "@redis-queue-manager/shared"
import { decode } from "next-auth/jwt"

export const decodeAuthJwt = async (token: string, isSecure: boolean) => {
  const salt = getJwtSalt(isSecure)
  
  const user = await decode({ token, secret: process.env.AUTH_SECRET!, salt })

  return user
}

export const getJwtSalt = (isSecure: boolean) => {
  return isSecure ? AuthJwtNameEnum.SECURE_NAME : AuthJwtNameEnum.DEFAULT_NAME
}
