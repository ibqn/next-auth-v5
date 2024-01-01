import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "./header"
import { Social } from "./social"
import { BackButton } from "./back-button"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = (props: CardWrapperProps) => {
  const { children, headerLabel, showSocial, backButtonHref, backButtonLabel } =
    props

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton href={backButtonHref}>{backButtonLabel}</BackButton>
      </CardFooter>
    </Card>
  )
}
