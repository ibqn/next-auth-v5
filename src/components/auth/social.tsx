import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_SIGN_IN_REDIRECT } from "@/routes"

type Props = {}

export const Social = (props: Props) => {
  const handleLogin = (provider: "google" | "github") => () => {
    signIn(provider, { callbackUrl: DEFAULT_SIGN_IN_REDIRECT })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={handleLogin("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={handleLogin("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
