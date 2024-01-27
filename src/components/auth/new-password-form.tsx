"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { type NewPasswordPayload, newPasswordValidator } from "@/lib/validators"
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
import { Button } from "@/components/ui/button"
import { type PasswordUpdateResponse, updatePassword } from "@/actions"
import { useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { useSearchParams } from "next/navigation"

type Props = {}

export const NewPasswordForm = (props: Props) => {
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const form = useForm<NewPasswordPayload>({
    resolver: zodResolver(newPasswordValidator),
  })

  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<PasswordUpdateResponse | null>(null)

  const handleSubmit = form.handleSubmit(async (data) => {
    setDisabled(true)
    setResponse(null)
    const response = await updatePassword(data, token)
    setResponse(response)
    setDisabled(false)
  })

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/sign-in"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
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
            Update password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
