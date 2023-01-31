import { SetStateAction, useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import {
  Button,
  ButtonText,
  Header,
  Input,
  NoteItem,
  Textarea,
} from "../components"
import { api } from "../services"

function New() {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [observations, setObservations] = useState<string>("")
  const navigate = useNavigate()

  const handleAddTag = () => {
    if (!newTag) {
      return alert("Preencha o marcador!")
    }
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleBack() {
    navigate("/")
  }

  const handleDeleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((_, i) => i !== index))
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Preencha o título!")
    }

    if (newTag) {
      return alert(`
        Por favor, adicione o marcador "${newTag}" antes de salvar o filme!
      `)
    }

    const data = {
      title,
      description: observations,
      rating,
      tags,
    }

    await api.post("/notes", data)
    alert("Filme cadastrado com sucesso!")
    navigate(-1)
  }

  return (
    <section>
      <Header search="" setSearch={() => {}} />
      <main className="max-w-6xl mx-auto mt-10 px-3 sm:px-6 md:px-10">
        <form>
          <header>
            <ButtonText
              title="Voltar"
              icon={FiArrowLeft}
              onClick={handleBack}
            />
            <h1 className="mt-6 mb-10 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-WHITE_100">
              Novo filme
            </h1>
          </header>
          <div className="flex flex-col sm:flex-row  gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-10">
            <Input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Sua nota (de 0 a 5)"
              type="number"
              value={rating.toString()}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
          </div>
          <Textarea
            placeholder="Observações"
            value={observations}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setObservations(e.target.value)
            }
          />
        </form>
        <div className="mt-10 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-GRAY_300">
            Marcadores
          </h2>
          <div className="rounded-lg bg-BACKGROUND_900 h-full flex items-center mt-6 mb-10 flex-wrap">
            {tags.map((tag, index) => (
              <NoteItem
                key={String(index)}
                value={tag}
                onClick={() => handleDeleteTag(index)}
              />
            ))}

            <NoteItem
              isNew
              placeholder="Novo marcador"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onClick={handleAddTag}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-6 md:gap-8 lg:gap-10">
            <Button
              label="Cancelar"
              bgColor="BACKGROUND_900"
              color="PINK"
              onClick={() => navigate(-1)}
            />
            <Button
              label="Salvar alterações"
              color="#312E38"
              onClick={handleNewNote}
            />
          </div>
        </div>
      </main>
    </section>
  )
}

export default New
