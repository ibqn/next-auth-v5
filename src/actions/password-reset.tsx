"use server"

import { passwordResetValidator, PasswordResetPayload } from "@/lib/validators"
import { getUserByEmail } from "@/utils/prisma"

export type PasswordResetResponse = {
  message: string
  type: "success" | "error"
}

export const passwordReset = async (
  data: PasswordResetPayload
): Promise<PasswordResetResponse> => {
  console.log("data:", data)

  const validatedFields = passwordResetValidator.safeParse(data)

  if (!validatedFields.success) {
    return { message: "Password reset failed", type: "error" }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { message: "Password Reset failed", type: "error" }
  }

  return { message: "Email verification sent", type: "success" }
}
