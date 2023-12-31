type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-gradient-120 from-blue-5 to-lime-3 flex h-full items-center justify-center">
      {children}
    </div>
  )
}
