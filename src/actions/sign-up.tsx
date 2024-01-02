"use server"

import { type SignUpPayload } from "@/lib/validators"

export type SignUpResponse = {
  message: string
  type: "success" | "error"
}

export const signUp = async (data: SignUpPayload): Promise<SignUpResponse> => {
  console.log("data:", data)

  return { message: "Email sent", type: "success" }
}
