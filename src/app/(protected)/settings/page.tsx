import { SettingsForm } from "@/components/auth"
import { getCurrentUser } from "@/utils/auth"
import { getUserById } from "@/utils/prisma"
import { notFound } from "next/navigation"

export default async function SettingsPage() {
  const sessionUser = await getCurrentUser()

  if (!sessionUser) {
    notFound()
  }

  const user = await getUserById(sessionUser.id)

  if (!user) {
    notFound()
  }

  return <SettingsForm user={user} />
}
