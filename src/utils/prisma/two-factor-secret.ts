import { prisma } from "@/lib/prisma"

export const getTwoFactorSecretByUserId = async (userId: string) => {
  try {
    const twoFactorSecret = await prisma.twoFactorSecret.findFirst({
      where: { userId },
    })
    return twoFactorSecret
  } catch (error) {
    return null
  }
}
