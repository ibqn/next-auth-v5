import { auth } from "@/auth"
import { SettingsForm } from "@/components/auth"

export default async function SettingsPage() {
  const session = await auth()

  return <SettingsForm />
}
