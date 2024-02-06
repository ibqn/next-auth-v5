"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { TwoFactorPayload, twoFactorValidator } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { getTwoFactorSecret } from "@/actions"
import {
  type TwoFactorUpdateResponse,
  updateTwoFactor,
} from "@/actions/two-factor-update"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"
import { useRouter } from "next/navigation"

type Props = {
  isTwoFactorEnabled: boolean
}

export const TwoFactorForm = (props: Props) => {
  const form = useForm<TwoFactorPayload>({
    resolver: zodResolver(twoFactorValidator),
    defaultValues: {
      code: "",
      isTwoFactorEnabled: props.isTwoFactorEnabled,
    },
  })

  const router = useRouter()

  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<TwoFactorUpdateResponse | null>(null)
  const isTwoFactorEnabled = form.watch("isTwoFactorEnabled")

  const [otpauth, setOtpauth] = useState<string | null>(null)

  useEffect(() => {
    const fetchTwoFactorData = async () => {
      try {
        const response = await getTwoFactorSecret()
        setOtpauth(response.otpauth)
        form.setValue("secret", response.secret)
      } catch (error) {
        console.error(error)
      }
    }

    if (isTwoFactorEnabled) {
      fetchTwoFactorData()
    }
  }, [isTwoFactorEnabled, form])

  const handleSubmit = form.handleSubmit(async (data) => {
    setDisabled(true)
    console.log(data)
    const response = await updateTwoFactor(data)
    router.refresh()
    setResponse(response)
    setDisabled(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Two-factor authentication</FormLabel>
                <FormDescription>
                  Enable two-factor authentication to improve your account
                  protection.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isTwoFactorEnabled && (
          <>
            <div className="flex flex-col items-center gap-y-4">
              {otpauth && <QRCodeSVG value={otpauth} />}

              <span className="text-sm text-muted-foreground">
                Scan this QR Code image with Google Authenticator, Authy or any
                other compatible 2FA app.
              </span>
            </div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation code</FormLabel>
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
          </>
        )}

        {response?.type === "success" && (
          <FormSuccess message={response.message} />
        )}

        {response?.type === "error" && <FormError message={response.message} />}

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  )
}
