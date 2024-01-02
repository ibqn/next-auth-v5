"use server"

import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"
import { StrippedSignUpPayload } from "@/lib/validators"
import { getUserByEmail } from "@/utils/prisma"

export type SignUpResponse = {
  message: string
  type: "success" | "error"
}

export const signUp = async (
  data: StrippedSignUpPayload
): Promise<SignUpResponse> => {
  console.log("data:", data)

  const { email, password, name } = data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { type: "error", message: "Email Already in use" }
  }

  await prisma.user.create({ data: { name, email, password: hashedPassword } })

  return { message: "Account created", type: "success" }
}
