import { UserRole } from "@prisma/client"
import { z } from "zod"

export const settingsValidator = z.object({
  name: z.string().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.nativeEnum(UserRole),
  email: z.string().optional(),
})

export type SettingsPayload = z.infer<typeof settingsValidator>
