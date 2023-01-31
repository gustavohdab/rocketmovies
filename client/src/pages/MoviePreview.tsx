import { useEffect, useState } from "react"
import { FiArrowLeft, FiClock } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import avatarPlaceholder from "../assets/avatar_placeholder.svg"
import { ButtonText, Header, Rating, Tag } from "../components"
import { formatDate } from "../helpers/formatDate"
import { useAuth } from "../hooks/auth"
import { api } from "../services"

function MoviePreview() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { id } = useParams()
  const [data, setData] = useState({
    note: {
      id: 0,
      rating: 0,
      title: "",
      description: "",
      created_at: "",
      user_id: 0,
    },
    tags: [
      {
        id: 0,
        name: "",
      },
    ],
  })

  function handleBack() {
    navigate(-1)
  }

  function handleDelete() {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir?")

    if (confirmDelete) {
      try {
        api.delete(`/notes/${id}`)
      } catch (error: any) {
        alert(error.response.data.message)
      } finally {
        navigate(-1)
      }
    }
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/notes/${id}`)
      setData(response.data)
    }
    fetchData()
  }, [])

  const { note, tags } = data

  return (
    <article>
      <Header search="" setSearch={() => {}} />
      <main className="max-w-[1137px] w-full px-6 sm:px-8 lg:px-32 py-10">
        <ButtonText title="Voltar" icon={FiArrowLeft} onClick={handleBack} />
        <header className="flex items-center gap-4 flex-wrap">
          <h1 className="text-4xl font-medium py-6 pr-2 text-WHITE capitalize">
            {note.title}
          </h1>
          <Rating rating={note.rating} fontSize={24} />
        </header>
        <div className="flex items-center pb-10">
          <img
            src={avatarUrl}
            alt={`Foto do usuário ${user.name}`}
            className="w-6 h-6 rounded-full border-[2px] border-BORDER_500"
          />
          <p className="flex mx-2 text-WHITE_100">Por {user.name}</p>
          <p className="flex items-center gap-2 text-WHITE_100">
            <FiClock className="text-PINK text-xl" />
            {formatDate(note.created_at)}
          </p>
        </div>

        {tags.map((tag) => (
          <Tag key={tag.id} title={tag.name} />
        ))}

        <p
          className="text-justify pt-10 text-WHITE_100"
          style={{ wordWrap: "break-word" }}
        >
          {note.description}
        </p>

        <div className="flex items-center gap-4 mt-10">
          <ButtonText title="Excluir" onClick={handleDelete} />
        </div>
      </main>
    </article>
  )
}

export default MoviePreview
