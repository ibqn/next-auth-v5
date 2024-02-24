import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { getUserById, getAccountByUserId } from "@/utils/prisma"
import { type UserRole } from "@prisma/client"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { env } from "@/lib/env"
import { authorizeUser } from "@/actions/authorize-user"

export type ExtendedUser = {
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
} & DefaultSession["user"]

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
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

      if (!user?.id) {
        return false
      }

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) {
        return false
      }

      return true
    },
    async jwt({ token }) {
      // console.log("token >", { token })

      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.name = existingUser.name
      token.email = existingUser.email
      token.isOauth = !!existingAccount

      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      // console.log("session >", { session })

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const user = await authorizeUser(credentials)
        return user
      },
    }),
  ],
})
