import { SignInForm } from "@/components/auth"
import { Suspense } from "react"

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
