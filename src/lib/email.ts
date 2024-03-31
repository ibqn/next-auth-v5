import { Resend } from "resend"
import { env } from "@/lib/env"

const resend = new Resend(env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/email-verification?token=${token}`

  // resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: `${email}`,
  //   subject: "Confirm your email",
  //   html: `<p>Please click this <a href="${confirmationLink}">link</a> to confirm email.</p>`,
  // })

  console.log(
    "sendVerificationEmail",
    email,
    "confirmationLink",
    confirmationLink
  )
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const passwordResetLink = `http://localhost:3000/auth/new-password?token=${token}`

  // resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: `${email}`,
  //   subject: "Reset your password",
  //   html: `<p>Please click this <a href="${passwordResetLink}">link</a> to set a new password.</p>`,
  // })

  console.log(
    "sendPasswordResetEmail",
    email,
    "passwordResetLink",
    passwordResetLink
  )
}
