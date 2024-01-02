"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { type SignInPayload, signInValidator } from "@/lib/validators"
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
import { SignInResponse, signIn } from "@/actions/sign-in"
import { useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type Props = {}

export const SignInForm = (props: Props) => {
  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInValidator),
  })

  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<SignInResponse | null>(null)

  const handleSubmit = form.handleSubmit(async (data) => {
    setDisabled(true)
    setResponse(null)
    const response = await signIn(data)
    setResponse(response)
    setDisabled(false)
  })

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      showSocial
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
          </div>

          {response?.type === "success" && (
            <FormSuccess message={response.message} />
          )}

          {response?.type === "error" && (
            <FormError message={response.message} />
          )}

          <Button type="submit" className="w-full" disabled={isDisabled}>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
