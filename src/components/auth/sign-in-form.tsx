import { CardWrapper } from "./card-wrapper"

type Props = {}

export const SignInForm = (props: Props) => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      showSocial
    >
      SignInForm
    </CardWrapper>
  )
}
