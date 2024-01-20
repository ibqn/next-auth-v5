import { Badge } from "@/components/ui/badge"

type Props = {
  flag?: boolean
}

export const BadgeInfo = (props: Props) => {
  return (
    <Badge variant={props.flag ? "success" : "destructive"}>
      {props.flag ? "ON" : "OFF"}
    </Badge>
  )
}
