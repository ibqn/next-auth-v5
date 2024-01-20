import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

type Props = {
  children: React.ReactNode
}

export default async function ClientLayout({ children }: Props) {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
