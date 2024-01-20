type Props = {
  text?: string
}

export const TextInfo = (props: Props) => {
  return (
    <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
      {props.text}
    </p>
  )
}
