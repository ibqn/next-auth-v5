"use client"

import { signOut } from "@/actions"
import { Button } from "@/components/ui/button"
import { type ComponentProps } from "react"

type Props = {} & ComponentProps<typeof Button>

export const SignOutButton = ({ children, ...props }: Props) => {
  return (
    <Button
      {...props}
      onClick={() => {
        signOut()
      }}
    >
      {children}
    </Button>
  )
}
