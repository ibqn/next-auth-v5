import { type ExtendedUser } from "@/auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TextInfo } from "./text-info"
import { BadgeInfo } from "./badge-info"

type Props = {
  user?: ExtendedUser
  label: string
}

export const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className=" w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <TextInfo text={user?.id} />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <BadgeInfo flag={user?.isTwoFactorEnabled} />
        </div>
      </CardContent>
    </Card>
  )
}
