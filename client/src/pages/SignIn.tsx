import { useState } from "react"
import { FiLock, FiMail } from "react-icons/fi"
import { Link } from "react-router-dom"
import authBg from "../assets/auth-bg.jpg"
import { Button, Input } from "../components"
import { useAuth } from "../hooks/auth"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()

  function handleSignIn() {
    signIn({
      email,
      password,
    })
  }
  return (
    <section className="flex h-screen items-stretch">
      <form
        action=""
        className="flex flex-1 flex-col justify-center px-8 md:px-20 lg:px-[136px] md:flex-grow-0"
      >
        <h1 className="font-bold text-PINK text-4xl md:text-5xl mb-2">
          RocketMovies
        </h1>
        <p className="text-GRAY_400 text-sm">
          Aplicação para acompanhar tudo que assistir.
        </p>
        <h2 className="font-medium text-2xl my-12 text-white">
          Faça seu login
        </h2>

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col items-center gap-[42px] mt-6">
          <Button
            label="Entrar"
            color="BACKGROUND_600"
            onClick={handleSignIn}
          />
          <Link to="/register" className="text-PINK">
            Criar conta
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

export default SignIn
