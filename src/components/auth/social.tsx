import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

type Props = {}

export const Social = (props: Props) => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button className="w-full" variant="outline" size="lg">
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button className="w-full" variant="outline" size="lg">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
