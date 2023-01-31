import { useState } from "react"
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import authBg from "../assets/auth-bg.jpg"
import { Button, Input } from "../components"
import { api } from "../services/index"

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const handleChange = (e: { target: { name: any; value: any } }) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!name || !email || !password) {
      return alert("Please fill out all fields")
    }

    try {
      await api.post("/users", { name, email, password })
      alert("User created successfully")
      navigate("/")
    } catch (error: any) {
      if (error.response) {
        return alert(error.response.data.message)
      }
    } finally {
      setFormData({ name: "", email: "", password: "" })
    }
  }

  return (
    <section className="flex h-screen items-stretch">
      <form
        action=""
        className="flex flex-1 flex-col justify-center px-8 md:px-20 lg:px-[136px] md:flex-grow-0"
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold text-PINK text-4xl md:text-5xl mb-2">
          RocketMovies
        </h1>
        <p className="text-GRAY_400 text-sm">
          Aplicação para acompanhar tudo que assistir.
        </p>
        <h2 className="font-medium text-2xl my-12 text-white">
          Crie sua conta
        </h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          name="name"
          value={name}
          onChange={handleChange}
          autoComplete="username"
        />
        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
        />
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <div className="flex flex-col items-center gap-[42px]">
          <Button
            label="Cadastrar"
            color="BACKGROUND_600"
            type="submit"
            onClick={handleSignUp}
          />
          <Link to="/" className="flex flex-row items-center gap-2 text-PINK">
            <FiArrowLeft className="text-xl" />
            Voltar para o login
          </Link>
        </div>
      </form>
      <aside className="hidden md:block flex-1 ">
        <img
          src={authBg}
          alt="Background Image"
          className="object-cover bg-center h-full w-full"
        />
      </aside>
    </section>
  )
}

export default SignUp
