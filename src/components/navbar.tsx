"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserButton } from "@/components/auth"
import { UserRole } from "@prisma/client"

type Props = {
  role?: UserRole
}

export const Navbar = ({ role }: Props) => {
  const navLinks = useMemo(
    () =>
      [
        { path: "/client", name: "Client" },
        { path: "/server", name: "Server" },
        { path: "/admin", name: "Admin", protectedNav: true },
        { path: "/settings", name: "Settings" },
      ].filter(({ protectedNav }) => !protectedNav || role === UserRole.ADMIN),
    [role]
  )

  const pathname = usePathname()

  return (
    <nav className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        {navLinks.map(({ path, name }, index) => (
          <Button
            key={index}
            asChild
            size="sm"
            variant={pathname === path ? "default" : "outline"}
          >
            <Link href={path}>{name}</Link>
          </Button>
        ))}
      </div>

      <UserButton />
    </nav>
  )
}
