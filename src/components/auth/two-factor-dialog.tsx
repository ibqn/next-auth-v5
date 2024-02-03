import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"
import { TwoFactorForm } from "./two-factor-form"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const TwoFactorDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{props.trigger}</DialogTrigger> */}
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
          <TwoFactorForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
