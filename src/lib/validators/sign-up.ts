import { z } from "zod"

export const signUpValidator = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Minimum 6 characters required" }),
    name: z.string().trim().min(1, { message: "Name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type SignUpPayload = z.infer<typeof signUpValidator>

export type StrippedSignUpPayload = Omit<SignUpPayload, "confirmPassword">
