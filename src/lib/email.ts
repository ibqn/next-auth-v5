import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/email-verification?token=${token}`

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: `${email}`,
    subject: "Confirm your email",
    html: `<p>Please click this <a href="${confirmationLink}">link</a> to confirm email.</p>`,
  })
}
