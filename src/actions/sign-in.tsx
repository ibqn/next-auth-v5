"use server"

import { type SignInPayload } from "@/lib/validators"

export type SignInResponse = {
  message: string
  type: "success" | "error"
}

export const signIn = async (data: SignInPayload): Promise<SignInResponse> => {
  console.log("data:", data)

  return { message: "Email sent", type: "success" }
}
