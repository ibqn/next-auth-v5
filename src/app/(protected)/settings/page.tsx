import { auth } from "@/auth"

export default async function SettingsPage() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      settings
      <div>{JSON.stringify(session)}</div>
    </main>
  )
}
