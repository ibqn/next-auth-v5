"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import {
  type PasswordResetPayload,
  passwordResetValidator,
} from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { type PasswordResetResponse, passwordReset } from "@/actions"
import { useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type Props = {}

export const PasswordResetForm = (props: Props) => {
  const form = useForm<PasswordResetPayload>({
    resolver: zodResolver(passwordResetValidator),
  })

  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<PasswordResetResponse | null>(null)

  const handleSubmit = form.handleSubmit(async (data) => {
    setDisabled(true)
    setResponse(null)
    const response = await passwordReset(data)
    setResponse(response)
    setDisabled(false)
  })

  return (
    <CardWrapper
      headerLabel="Reset password"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/sign-in"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {response?.type === "success" && (
            <FormSuccess message={response.message} />
          )}

          {response?.type === "error" && (
            <FormError message={response?.message} />
          )}

          <Button type="submit" className="w-full" disabled={isDisabled}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
