import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { ExitIcon } from "@radix-ui/react-icons"
import { signOut } from "@/actions"
import { type ExtendedUser } from "@/auth"

type Props = {
  user?: ExtendedUser
}

export const UserButton = ({ user }: Props) => {
  const handleSignOut = () => {
    signOut()
  }

  console.log("image", user?.image)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback className="bg-gradient-120 from-indigo-6 to-cyan-3">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={handleSignOut}>
          <ExitIcon className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
