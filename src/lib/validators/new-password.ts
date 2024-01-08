import { z } from "zod"

export const newPasswordValidator = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Minimum 6 characters required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type NewPasswordPayload = z.infer<typeof newPasswordValidator>

export type StrippedNewPasswordPayload = Omit<
  NewPasswordPayload,
  "confirmPassword"
>
