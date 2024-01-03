"use server"

import { signInValidator, type SignInPayload } from "@/lib/validators"
import { signIn as authSignIn } from "@/auth"
import { DEFAULT_SIGN_IN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export type SignInResponse = {
  message: string
  type: "success" | "error"
}

export const signIn = async (data: SignInPayload): Promise<SignInResponse> => {
  console.log("data:", data)

  const validatedFields = signInValidator.safeParse(data)

  if (!validatedFields.success) {
    return { message: "Sign in failed", type: "error" }
  }

  const { email, password } = validatedFields.data

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGN_IN_REDIRECT,
    })
  } catch (error) {
    console.error(error)
    if (error instanceof AuthError) {
      return { message: "Sign in failed", type: "error" }
    }

    throw error
  }

  return { message: "Email sent", type: "success" }
}
