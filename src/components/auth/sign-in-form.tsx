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
import { Button } from "@/components/ui/button"
import { SignInResponse, signIn } from "@/actions"
import { useMemo, useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/utils"

type Props = {}

export const SignInForm = (props: Props) => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : undefined

  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
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

  const responseType = useMemo(
    () => (response && "type" in response ? response.type : undefined),
    [response]
  )

  const responseMessage = useMemo(
    () => (response && "message" in response ? response.message : undefined),
    [response]
  )

  const isTwoFactor = useMemo(
    () => (response && "twoFactor" in response ? response.twoFactor : false),
    [response]
  )

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
              name="code"
              render={({ field }) => (
                <FormItem className={cn(!isTwoFactor && "hidden")}>
                  <FormLabel>Two-factor confirmation code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="XXXXXX"
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={cn(isTwoFactor && "hidden")}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="username"
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
                <FormItem className={cn(isTwoFactor && "hidden")}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      placeholder="******"
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {responseType === "success" && (
            <FormSuccess message={responseMessage} />
          )}

          {(responseType === "error" || urlError) && (
            <FormError message={responseMessage || urlError} />
          )}

          <Button type="submit" className="w-full" disabled={isDisabled}>
            {isTwoFactor ? "Confirm" : "Sign In"}
          </Button>
        </form>
      </Form>

      <Button size="sm" variant="link" asChild className="px-0 font-normal">
        <Link href="/auth/password-reset">Forgot password?</Link>
      </Button>
    </CardWrapper>
  )
}
