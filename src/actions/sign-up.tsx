"use server"

import bcrypt from "bcrypt"
import { StrippedSignUpPayload } from "@/lib/validators"

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

  return { message: "signed up", type: "success" }
}
