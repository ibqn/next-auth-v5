"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { useCallback, useEffect, useState } from "react"
import { type EmailVerificationResponse, emailVerification } from "@/actions"
import { CircleLoader } from "./circle-loader"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type Props = {}

export const EmailVerificationForm = (props: Props) => {
  const [response, setResponse] = useState<EmailVerificationResponse | null>(
    null
  )

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(async () => {
    if (response) {
      return
    }

    const verificationResponse = await emailVerification(token)
    setResponse(verificationResponse)
  }, [token, response])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirm your email address"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/sign-in"
    >
      <div className="flex w-full items-center justify-center">
        {!response && <CircleLoader />}
        {response?.type === "error" && <FormError message={response.message} />}
        {response?.type === "success" && (
          <FormSuccess message={response.message} />
        )}
      </div>
    </CardWrapper>
  )
}
