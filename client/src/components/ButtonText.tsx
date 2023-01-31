interface ButtonTextProps {
  title: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  isActive?: boolean
  onClick?: () => void
}

function ButtonText({ title, icon: Icon, isActive, onClick }: ButtonTextProps) {
  return (
    <button
      className={`
      bg-none
      ${isActive ? "text-GRAY_400" : "text-PINK"}
    `}
      onClick={onClick}
    >
      <span className="first-letter:capitalize flex items-center gap-2">
        {Icon && <Icon className="text-xl" />}
        {title}
      </span>
    </button>
  )
}

export default ButtonText
