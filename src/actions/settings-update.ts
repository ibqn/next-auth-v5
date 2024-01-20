"use server"

import { SettingsPayload } from "@/lib/validators"
import { getCurrentUser } from "@/utils/auth"
import { getUserById } from "@/utils/prisma"
import { prisma } from "@/lib/prisma"

export type SettingsUpdateResponse = {
  message: string
  type: "success" | "error"
}

export const updateSettings = async (
  data: SettingsPayload
): Promise<SettingsUpdateResponse> => {
  const user = await getCurrentUser()

  if (!user) {
    return { message: "Unauthorized", type: "error" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { message: "Unauthorized", type: "error" }
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...data },
  })

  return { message: "Settings updated", type: "success" }
}
