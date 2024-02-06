"use server"

import { TwoFactorPayload } from "@/lib/validators"
import { getCurrentUser } from "@/utils/auth"
import { getUserById } from "@/utils/prisma"
import { prisma } from "@/lib/prisma"
import { authenticator } from "otplib"

export type TwoFactorUpdateResponse = {
  message: string
  type: "success" | "error"
}

export const updateTwoFactor = async (
  data: TwoFactorPayload
): Promise<TwoFactorUpdateResponse> => {
  const user = await getCurrentUser()

  if (!user?.id) {
    return { message: "Unauthorized", type: "error" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { message: "Unauthorized", type: "error" }
  }

  if (data.isTwoFactorEnabled) {
    let isValid = false

    try {
      isValid = authenticator.verify({
        token: data.code,
        secret: data.secret,
      })
    } catch (error) {
      console.error("Error verifying token:", error)
    }

    if (!isValid) {
      return { message: "Invalid verification code", type: "error" }
    }

    await prisma.twoFactorSecret.upsert({
      where: { userId: dbUser.id },
      update: { secret: data.secret, userId: dbUser.id },
      create: { secret: data.secret, userId: dbUser.id },
    })
  } else {
    await prisma.twoFactorSecret.deleteMany({ where: { userId: dbUser.id } })
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { isTwoFactorEnabled: data.isTwoFactorEnabled },
  })

  return { message: "Two-factor settings updated", type: "success" }
}
