import { SignInButton } from "@/components/auth"
import { KeySquare } from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-7 bg-gradient-120 from-indigo-6 to-crimson-5 p-24">
      <div className="flex flex-row items-center gap-x-2 text-white drop-shadow-md">
        <KeySquare size={58} className="mb-2" />
        <h1 className="text-6xl font-semibold text-white ">Auth</h1>
      </div>
      <p className="text-lg text-white">A simple authentication service</p>

      <SignInButton size="lg" />
    </main>
  )
}
