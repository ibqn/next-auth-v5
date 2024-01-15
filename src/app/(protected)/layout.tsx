import { Navbar } from "@/components/navbar"

type Props = {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="from-indigo-6 to-cyan-3 flex min-h-screen flex-col items-center justify-center gap-y-10 bg-gradient-120">
      <Navbar />
      {children}
    </div>
  )
}
