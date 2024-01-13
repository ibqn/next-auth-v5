import { auth } from "@/auth"
import { SignOutButton } from "@/components/auth"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <main className="flex flex-col items-center justify-center p-24">
      settings
      <div>{JSON.stringify(session)}</div>
      <SignOutButton>Sign Out</SignOutButton>
    </main>
  )
}
