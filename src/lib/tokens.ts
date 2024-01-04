import { addHours } from "date-fns"
import { randomUUID } from "crypto"
import { getVerificationTokenByEmail } from "@/utils/prisma/verification-token"
import { prisma } from "@/lib/prisma"

export const generateVerificationToken = async (email: string) => {
  const token = randomUUID()
  const expires = addHours(new Date(), 1)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}
