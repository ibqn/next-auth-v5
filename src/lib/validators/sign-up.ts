import { z } from "zod"

export const signUpValidator = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 characters required" }),
  name: z.string().trim().min(1, { message: "Name is required" }),
})

export type SignUpPayload = z.infer<typeof signUpValidator>
