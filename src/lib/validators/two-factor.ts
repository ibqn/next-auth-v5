import { z } from "zod"

export const twoFactorValidator = z.object({
  isTwoFactorEnabled: z.boolean(),
  secret: z.string(),
  code: z.string(),
})

export type TwoFactorPayload = z.infer<typeof twoFactorValidator>
