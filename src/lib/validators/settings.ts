import { z } from "zod"

export const settingsValidator = z.object({
  name: z.string().optional(),
})

export type SettingsPayload = z.infer<typeof settingsValidator>
