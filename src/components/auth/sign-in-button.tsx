import { type ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = ComponentProps<typeof Button>

export const SignInButton = (props: Props) => {
  return (
    <Button asChild variant="secondary" {...props}>
      <Link href="/auth/sign-in">Sign in</Link>
    </Button>
  )
}
