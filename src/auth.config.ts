import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { signInValidator } from "@/lib/validators"
import { getUserByEmail } from "@/utils/prisma"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInValidator.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          return null
        }

        const havePasswordMatch = await bcrypt.compare(password, user.password)

        if (havePasswordMatch) {
          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
