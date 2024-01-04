import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "./card-wrapper"

type Props = {}

export const ErrorCard = (props: Props) => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to sign in"
    >
      <div className="flex w-full items-center justify-center gap-x-2 text-destructive">
        <ExclamationTriangleIcon className="h-5 w-5" />
        <span className="text-sm">Auth error occurred</span>
      </div>
    </CardWrapper>
  )
}
