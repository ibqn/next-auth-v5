"use server"

import { signInValidator, type SignInPayload } from "@/lib/validators"
import { signIn as authSignIn } from "@/auth"
import { DEFAULT_SIGN_IN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/utils/prisma"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/email"

export type SignInResponse =
  | {
      message: string
      type: "success" | "error"
    }
  | { twoFactor: boolean }

export const signIn = async (data: SignInPayload): Promise<SignInResponse> => {
  console.log("data:", data)

  const validatedFields = signInValidator.safeParse(data)

  if (!validatedFields.success) {
    return { message: "Sign in failed", type: "error" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser?.email || !existingUser?.password) {
    return { message: "Sign in failed", type: "error" }
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(existingUser.email, verificationToken.token)

    return { message: "Email verification sent", type: "success" }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code === undefined) {
      return { twoFactor: true }
    }
  }

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGN_IN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Sign in failed", type: "error" }
    }

    throw error
  }
  return { message: "Email verification sent", type: "success" }
}
