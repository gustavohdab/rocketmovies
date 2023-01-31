interface ButtonProps {
  label: string
  loading?: boolean
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  disabled?: boolean
  bgColor?: string
  color?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
}

function Button({
  label,
  loading = false,
  icon: Icon,
  bgColor = "PINK",
  color = "PINK",
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      disabled={loading || disabled}
      className={`
      w-full bg-${bgColor} text-${color} 
      h-14 px-8 mt-3 rounded-xl font-medium disabled:cursor-not-allowed disabled:opacity-50 capitalize flex items-center justify-center gap-2
  `}
      onClick={handleClick}
      {...rest}
    >
      {Icon && <Icon className="text-xl" />}
      {loading ? "Carregando..." : label}
    </button>
  )
}

export default Button
