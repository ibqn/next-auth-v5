import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      settings
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server"

          await signOut()
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </main>
  )
}
