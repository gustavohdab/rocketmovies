import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface RatingProps {
  rating: number
  fontSize: number
}

function Rating({ rating, fontSize }: RatingProps) {
  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<AiFillStar key={i} style={{ fontSize }} />)
    } else {
      stars.push(<AiOutlineStar key={i} style={{ fontSize }} />)
    }
  }

  return <div className="flex items-center gap-1 text-PINK mt-2">{stars}</div>
}

export default Rating
