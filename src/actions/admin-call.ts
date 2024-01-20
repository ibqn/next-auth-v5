"use server"

import { getCurrentRole } from "@/utils/auth"
import { UserRole } from "@prisma/client"

export type AdminCallResponse = {
  ok: boolean
}

export const adminCall = async (): Promise<AdminCallResponse> => {
  const role = await getCurrentRole()

  if (role !== UserRole.ADMIN) {
    return { ok: false }
  }

  return { ok: true }
}
