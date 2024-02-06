import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TwoFactorForm } from "./two-factor-form"
import { getCurrentUser } from "@/utils/auth"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const TwoFactorDialog = ({ open, setOpen }: Props) => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(false)

  useEffect(() => {
    const queryTwoFactorState = async () => {
      const user = await getCurrentUser()
      setIsTwoFactorEnabled(user?.isTwoFactorEnabled ?? false)
    }

    queryTwoFactorState()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Two-factor authentication
          </DialogTitle>
          <DialogDescription>
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <TwoFactorForm isTwoFactorEnabled={isTwoFactorEnabled} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
