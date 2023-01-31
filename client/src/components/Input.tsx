interface InputProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  placeholder?: string | undefined
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  autoComplete?: string
}

function Input({ icon: Icon, autoComplete, ...rest }: InputProps) {
  return (
    <div
      className="
      w-full 
      max-w-2xl
      h-[56px]
      px-4 rounded-lg items-center flex gap-2
      bg-INPUT_500 mb-2 last-of-type:mb-0
    "
    >
      {Icon && <Icon className="text-xl text-GRAY_200" />}
      <input
        className="w-full bg-transparent text-WHITE_100 focus:outline-none border-0 placeholder-GRAY_200"
        autoComplete={autoComplete}
        {...rest}
      />
    </div>
  )
}

export default Input
