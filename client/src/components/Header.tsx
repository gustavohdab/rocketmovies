import { AiOutlineSearch } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import avatarPlaceholder from "../assets/avatar_placeholder.svg"
import { useAuth } from "../hooks/auth"
import { api } from "../services"
import Input from "./Input"

interface HeaderProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function Header({ search, setSearch }: HeaderProps) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    navigate("/")
    signOut()
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder
  return (
    <header className="lg:flex sm:justify-between md:items-center sm:flex-col md:flex-row py-4 px-12 lg:h-[116px] mb-10 border-b border-BORDER_500 ">
      <h1 className="text-2xl sm:text-3xl font-bold text-PINK ">
        RocketMovies
      </h1>

      <Input
        icon={AiOutlineSearch}
        placeholder="Pesquisar pelo título"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex items-center gap-3 justify-end">
        <div className="flex flex-col items-end">
          <strong className="font-bold text-sm leading-5 lg:text-base text-WHITE_100">
            {user.name}
          </strong>
          <button
            className="text-sm leading-5 font-normal text-GRAY_200 lowercase"
            type="submit"
            onClick={handleSignOut}
          >
            sair
          </button>
        </div>

        <Link to="/profile">
          <img
            src={avatarUrl}
            alt={`Foto do usuário ${user.name}`}
            className="w-16 h-16 rounded-full border-[3px] border-BORDER_500 md:items-end"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
