import { auth } from "@/auth"
import { SignOutButton } from "@/components/auth"

export default async function AdminPage() {
  const session = await auth()

  return (
    <main className="flex flex-col items-center justify-center p-24">
      Admin page
      <div>{JSON.stringify(session)}</div>
      <SignOutButton>Sign Out</SignOutButton>
    </main>
  )
}
