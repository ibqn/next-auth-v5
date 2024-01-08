"use server"

import { prisma } from "@/lib/prisma"
import {
  newPasswordValidator,
  type StrippedNewPasswordPayload,
} from "@/lib/validators"
import { getPasswordResetTokenByToken, getUserByEmail } from "@/utils/prisma"
import { compareDesc } from "date-fns"
import bcrypt from "bcrypt"

export type PasswordUpdateResponse = {
  message: string
  type: "success" | "error"
}

export const updatePassword = async (
  data: StrippedNewPasswordPayload,
  token: string | null
): Promise<PasswordUpdateResponse> => {
  console.log("data:", token)

  const validatedFields = newPasswordValidator.safeParse(data)

  if (!validatedFields.success) {
    return { message: "Password update failed", type: "error" }
  }

  const { password } = validatedFields.data

  if (!token) {
    return { message: "No Verification token present", type: "error" }
  }

  const existingPasswordUpdateToken = await getPasswordResetTokenByToken(token)

  if (!existingPasswordUpdateToken) {
    return { type: "error", message: "Verification token has expired" }
  }

  const hasExpired =
    compareDesc(existingPasswordUpdateToken.expires, new Date()) > 0

  if (hasExpired) {
    return { type: "error", message: "Verification token has expired" }
  }

  if (existingPasswordUpdateToken.deleted) {
    return { type: "error", message: "Verification token has expired" }
  }

  const existingUser = await getUserByEmail(existingPasswordUpdateToken.email)

  if (!existingUser) {
    return { type: "error", message: "Verification token has expired" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.update({
    where: { id: existingPasswordUpdateToken.id },
    data: { deleted: new Date() },
  })

  return { message: "Password successfully updated", type: "success" }
}
