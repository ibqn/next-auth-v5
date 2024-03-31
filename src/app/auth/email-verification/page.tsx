import { EmailVerificationForm } from "@/components/auth"
import { Suspense } from "react"

export default function SignUpPage() {
  return (
    <Suspense>
      <EmailVerificationForm />
    </Suspense>
  )
}
