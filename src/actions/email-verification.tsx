"use server"

import { prisma } from "@/lib/prisma"
import { getUserByEmail, getVerificationTokenByToken } from "@/utils/prisma"
import { compareDesc } from "date-fns"

export type EmailVerificationResponse = {
  message: string
  type: "success" | "error"
}

export const emailVerification = async (
  token: string
): Promise<EmailVerificationResponse> => {
  console.log("data:", token)

  const existingVerificationToken = await getVerificationTokenByToken(token)

  if (!existingVerificationToken) {
    return { type: "error", message: "Verification token has expired" }
  }

  const hasExpired =
    compareDesc(existingVerificationToken.expires, new Date()) > 0

  if (hasExpired) {
    return { type: "error", message: "Verification token has expired" }
  }

  const existingUser = await getUserByEmail(existingVerificationToken.email)

  if (!existingUser) {
    return { type: "error", message: "Verification token has expired" }
  }

  if (existingUser.emailVerified) {
    return {
      message: "Email address successfully confirmed",
      type: "success",
    }
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingVerificationToken.email },
  })

  // await prisma.verificationToken.delete({
  //   where: { id: existingVerificationToken.id },
  // })

  return { message: "Email address successfully confirmed", type: "success" }
}
