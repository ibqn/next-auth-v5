"use client"

import { useForm } from "react-hook-form"
import { GearIcon } from "@radix-ui/react-icons"
import { settingsValidator, type SettingsPayload } from "@/lib/validators"
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
import { useState } from "react"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { updateSettings, type SettingsUpdateResponse } from "@/actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type User } from "@prisma/client"
import { useRouter } from "next/navigation"

type Props = {
  user: User
}

export const SettingsForm = ({ user }: Props) => {
  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<SettingsUpdateResponse | null>(null)

  const form = useForm<SettingsPayload>({
    resolver: zodResolver(settingsValidator),
    defaultValues: {
      name: user.name ?? "",
    },
  })

  const router = useRouter()

  const handleSubmit = form.handleSubmit(async (data) => {
    setDisabled(true)
    setResponse(null)
    const updateResponse = await updateSettings(data)
    setResponse(updateResponse)
    setDisabled(false)

    router.refresh()
  })

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <GearIcon className="mb-1 h-6 w-6" />
          <p className="text-center text-2xl font-semibold">Settings</p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Name"
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
              Update Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
