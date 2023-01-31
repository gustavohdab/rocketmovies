import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { Header, Movie } from "../components"
import { api } from "../services"

interface Note {
  id: number
  rating: number
  title: string
  description: string
  tags: Tag[]
}

interface Tag {
  id: number
  name: string
}

function Home() {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<Tag[]>([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState<Note[]>([])

  const navigate = useNavigate()

  const handleSelectTag = (tag: Tag) => {
    const isTagSelected = selectedTag.includes(tag)
    setSelectedTag(
      isTagSelected
        ? selectedTag.filter((item) => item !== tag)
        : [...selectedTag, tag]
    )
  }

  function handleDetails(id: number) {
    navigate(`/movie/${id}`)
  }

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await api.get("/tags")
      setTags(data.tags)
    }

    fetchTags()
  }, [])

  useEffect(() => {
    const fetchNotes = async () => {
      const tagNames = selectedTag.map((tag) => tag.name).join(",")
      const response = await api.get(
        `/notes?tags=${tagNames}&title=${search}&rating=${selectedTag}`
      )
      setNotes(response.data)
    }

    fetchNotes()
  }, [selectedTag, search])

  return (
    <main>
      <Header search={search} setSearch={setSearch} />
      <section className="container mx-auto px-4">
        <header className="flex items-center justify-between mb-9">
          <h2 className="text-3xl text-WHITE">Meus filmes</h2>
          <Link
            to="/new"
            className="
            flex items-center gap-2 bg-PINK  rounded-lg
            py-2 px-4
            sm:py-2 sm:px-4  
            md:py-2 md:px-6
            lg:py-3 lg:px-8
            "
          >
            <FiPlus className="text-xl" />
            Adicionar filme
          </Link>
        </header>
        <div>
          <h3 className="text-2xl text-WHITE mb-4">
            {selectedTag.length === 0
              ? "Todos os filmes"
              : `Filmes com ${
                  selectedTag.length >= 2
                    ? `as tags ${selectedTag.map((tag) => tag.name).join(", ")}`
                    : `a tag ${selectedTag[selectedTag.length - 1].name}`
                }`}
          </h3>
        </div>
        <div className="flex flex-row gap-4 mb-6 flex-wrap">
          <div
            className={`bg-BACKGROUND_500 px-5 py-2 rounded-lg cursor-pointer ${
              selectedTag.length === 0 ? "text-PINK" : "text-GRAY_400"
            }`}
            onClick={() => setSelectedTag([])}
          >
            Todos
          </div>
          {tags.map((tag) => (
            <div
              key={String(tag.id)}
              className={`bg-BACKGROUND_500 px-5 py-2 rounded-lg cursor-pointer ${
                selectedTag.find((selected) => selected.id === tag.id)
                  ? "text-PINK"
                  : "text-GRAY_400"
              }`}
              onClick={() => handleSelectTag(tag)}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="overflow-y-auto overflow-x-hidden max-h-[28rem] custom-scrollbar">
          {notes.map((note) => (
            <Movie
              key={note.id}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
