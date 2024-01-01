"use server"

import { type SignInPayload } from "@/lib/validators"

export const signIn = async (data: SignInPayload) => {
  console.log("data:", data)
}
