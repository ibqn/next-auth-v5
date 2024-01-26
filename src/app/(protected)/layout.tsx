import { Navbar } from "@/components/navbar"
import { getCurrentRole } from "@/utils/auth"

type Props = {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: Props) {
  const role = await getCurrentRole()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-10 bg-gradient-120 from-indigo-6 to-cyan-3">
      <Navbar role={role} />
      {children}
    </div>
  )
}
