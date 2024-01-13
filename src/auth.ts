import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { getUserById, getTwoFactorConfirmationByUserId } from "@/utils/prisma"
import { type UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true
      }

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) {
        return false
      }
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorConfirmation) {
          return false
        }

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }
      return true
    },
    async jwt({ token }) {
      console.log("token >", { token })

      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      token.role = existingUser.role

      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      console.log("session >", { session })

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
