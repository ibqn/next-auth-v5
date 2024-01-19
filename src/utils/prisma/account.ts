import { prisma } from "@/lib/prisma"

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findUnique({ where: { id: userId } })
    return account
  } catch (error) {
    return null
  }
}
