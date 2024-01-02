import { prisma } from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
  } catch (error) {
    return null
  }
}
