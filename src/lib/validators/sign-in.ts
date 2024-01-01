import { z } from "zod"

export const signInValidator = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
})

export type SignInPayload = z.infer<typeof signInValidator>
