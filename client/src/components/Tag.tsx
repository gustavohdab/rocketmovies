interface TagProps {
  title: string
  bgColor?: string
}

function Tag({ title, bgColor, ...rest }: TagProps) {
  return (
    <span
      className={`text-xs py-[5px] px-4 rounded-md mr-2 text-WHITE_100 ${
        bgColor || "bg-PINK/10"
      }`}
      {...rest}
    >
      {title}
    </span>
  )
}

export default Tag
