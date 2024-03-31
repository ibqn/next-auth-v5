import { NewPasswordForm } from "@/components/auth"
import { Suspense } from "react"

export default function PasswordResetPage() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  )
}
