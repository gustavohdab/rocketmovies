import Rating from "./Rating"
import Tag from "./Tag"

interface Tag {
  id: number
  name: string
}

interface MovieProps {
  data: {
    id: number
    rating: number
    title: string
    description: string
    tags: Tag[]
  }
  onClick?: () => void
}

function Movie({ data, ...rest }: MovieProps) {
  return (
    <button
      className="flex flex-col w-full gap-2 text-justify bg-PINK/10 p-8 rounded-2xl mb-6 last-of-type:mb-0 hover:filter hover:brightness-90 transition duration-200 ease-in"
      {...rest}
    >
      <h2 className="text-2xl font-bold capitalize text-WHITE flex-1">
        {data.title}
      </h2>
      <Rating rating={data.rating} fontSize={12} />
      <p
        className="text-base text-GRAY_400 mb-3"
        style={{
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          display: "-webkit-box",
          wordBreak: "break-word",
        }}
      >
        {data.description}
      </p>
      {data.tags && (
        <footer className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <Tag key={tag.id} title={tag.name} bgColor="bg-BACKGROUND_500" />
          ))}
        </footer>
      )}
    </button>
  )
}

export default Movie
