"use server"

import { getCurrentUser } from "@/utils/auth"
import { getTwoFactorSecretByUserId } from "@/utils/prisma"
import { authenticator } from "otplib"

export type TwoFactorSecretResponse = {
  secret: string
  otpauth: string
}

export const getTwoFactorSecret =
  async (): Promise<TwoFactorSecretResponse> => {
    const user = await getCurrentUser()

    if (!user?.id) {
      throw new Error("Unauthorized")
    }

    const twoFactorSecret = await getTwoFactorSecretByUserId(user.id)

    let secret = twoFactorSecret?.secret

    if (!secret) {
      secret = authenticator.generateSecret()
    }

    const otpauth = authenticator.keyuri(
      "next-auth-user",
      "next-auth-website",
      secret
    )

    return { secret, otpauth }
  }
