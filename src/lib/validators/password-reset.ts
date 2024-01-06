import { z } from "zod"

export const passwordResetValidator = z.object({
  email: z.string().email({ message: "Email is required" }),
})

export type PasswordResetPayload = z.infer<typeof passwordResetValidator>
