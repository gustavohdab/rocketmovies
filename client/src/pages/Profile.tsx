import { useState } from "react"
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"
import avatarPlaceholder from "../assets/avatar_placeholder.svg"
import { Button, Input } from "../components"
import { useAuth } from "../hooks/auth"
import { api } from "../services"

function Profile() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [formModified, setFormModified] = useState(false)

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState<File>()

  function handleUpdateProfile() {
    const updatedUser = {
      name,
      email,
      password,
      old_password: oldPassword,
    }

    const userUpdated = Object.assign(user, updatedUser)

    updateProfile({ user: userUpdated, avatarFile })
  }

  function handleChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setFormModified(true)
    setAvatarFile(file)
    setAvatar(URL.createObjectURL(file))
  }

  return (
    <section>
      <header className="w-full h-36 bg-PINK/10 flex items-center px-6 md:px-8 lg:px-40">
        <Link to="/" className="">
          <FiArrowLeft size={26} className="text-PINK" />
        </Link>
      </header>
      <form className="max-w-[340px] -mt-[120px] mx-auto p-5 relative">
        <figure className="mb-16 w-[186px] h-[186px] mx-auto relative">
          <img
            src={avatar}
            alt="Foto do usuário"
            className="w-[186px] h-[186px] rounded-full border-[3px] border-BORDER_500 mx-auto "
          />
          <label
            htmlFor="avatar"
            className="w-[48px] h-[48px] bg-PINK rounded-full flex items-center justify-center absolute right-0 bottom-2 cursor-pointer"
          >
            <FiCamera className="text-black" />
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={handleChangeAvatar}
            />
          </label>
        </figure>
        <Input
          placeholder="Nome"
          icon={FiUser}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setFormModified(true)
          }}
        />
        <Input
          placeholder="E-mail"
          icon={FiMail}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setFormModified(true)
          }}
        />
        <fieldset className="mt-6">
          <Input
            placeholder="Senha atual"
            icon={FiLock}
            type="password"
            onChange={(e) => {
              setOldPassword(e.target.value)
              setFormModified(true)
            }}
          />
          <Input
            placeholder="Nova senha"
            icon={FiLock}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
              setFormModified(true)
            }}
          />
        </fieldset>
        <Button
          label="Salvar"
          color="BACKGROUND_600"
          disabled={!formModified}
          onClick={handleUpdateProfile}
        />
      </form>
    </section>
  )
}

export default Profile
