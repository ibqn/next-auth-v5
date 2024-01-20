import { type ExtendedUser } from "@/auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TextInfo } from "./text-info"
import { BadgeInfo } from "./badge-info"
import { useMemo } from "react"

type Props = {
  user?: ExtendedUser
  label: string
}

type CardInfo = {
  name: string
} & (
  | {
      text?: string | null
      type: "text"
    }
  | {
      flag?: boolean
      type: "badge"
    }
)

export const UserInfo = ({ user, label }: Props) => {
  const cardInfoList = useMemo(
    () =>
      [
        {
          name: "ID",
          text: user?.id,
          type: "text",
        },
        {
          name: "Name",
          text: user?.name,
          type: "text",
        },
        {
          name: "Email",
          text: user?.email,
          type: "text",
        },
        {
          name: "Role",
          text: user?.role,
          type: "text",
        },
        {
          name: "Email",
          text: user?.email,
          type: "text",
        },
        {
          name: "Email",
          flag: user?.isTwoFactorEnabled,
          type: "badge",
        },
      ] satisfies CardInfo[],
    [user]
  )

  return (
    <Card className=" w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {cardInfoList.map((cardInfo, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
          >
            <p className="text-sm font-medium">{cardInfo.name}</p>

            {cardInfo.type === "text" && <TextInfo text={cardInfo.text} />}
            {cardInfo.type === "badge" && <BadgeInfo flag={cardInfo.flag} />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
