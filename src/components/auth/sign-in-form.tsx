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
import { signIn } from "@/actions/sign-in"
import { useTransition } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type Props = {}

export const SignInForm = (props: Props) => {
  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInValidator),
  })

  const [isPending, startTransaction] = useTransition()

  const handleSubmit = form.handleSubmit((data) =>
    startTransaction(() => signIn(data))
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      disabled={isPending}
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message="" />
          <FormSuccess message="" />

          <Button type="submit" className="w-full" disabled={isPending}>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
