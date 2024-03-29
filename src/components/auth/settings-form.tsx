"use client"

import { useForm } from "react-hook-form"
import { GearIcon, Pencil1Icon } from "@radix-ui/react-icons"
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
import { UserRole, type User } from "@prisma/client"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TwoFactorDialog } from "./two-factor-dialog"

type Props = {
  user: User
}

export const SettingsForm = ({ user }: Props) => {
  const [isDisabled, setDisabled] = useState(false)
  const [response, setResponse] = useState<SettingsUpdateResponse | null>(null)

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<SettingsPayload>({
    resolver: zodResolver(settingsValidator),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      role: user.role ?? UserRole.USER,
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

  const handleTwoFactorDialog = () => {
    setOpen(true)
  }

  return (
    <>
      <TwoFactorDialog open={open} setOpen={setOpen} />
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>

                      <Select
                        disabled={isDisabled}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>

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

              <div className="flex flex-row items-center justify-between rounded-lg border px-3 py-0 shadow-sm">
                <Button
                  type="button"
                  className="gap-x-2 px-2 font-normal"
                  variant="link"
                >
                  Update Password
                </Button>
                <button type="button">
                  <Pencil1Icon />
                </button>
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border px-3 py-0 shadow-sm">
                <Button
                  className="gap-x-2 px-2 font-normal"
                  type="button"
                  variant="link"
                  onClick={handleTwoFactorDialog}
                >
                  Two-factor authentication
                </Button>

                <Switch
                  checked={user.isTwoFactorEnabled ?? false}
                  onClick={handleTwoFactorDialog}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isDisabled}>
                Update Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
