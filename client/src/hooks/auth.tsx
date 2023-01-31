import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/index"

interface AuthData {
  user?: any
  token?: string
}

interface AuthContextProps {
  signIn: (data: { email: string; password: string }) => void
  signOut: () => void
  updateProfile: (data: { user: any; avatarFile?: File }) => void
  user?: any
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: () => {},
  signOut: () => {},
  updateProfile: () => {},
})

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthData>({})

  async function signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      localStorage.setItem("@rocketmovies:user", JSON.stringify(user))
      localStorage.setItem("@rocketmovies:token", token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setData({ user, token })
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível entrar.")
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketmovies:token")
    localStorage.removeItem("@rocketmovies:user")

    setData({})
  }

  async function updateProfile({
    user,
    avatarFile,
  }: {
    user: any
    avatarFile?: File
  }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }

      await api.put("/users", user)
      localStorage.setItem("@rocketmovies:user", JSON.stringify(user))

      setData({ user, token: data.token })
      alert("Perfil atualizado!")
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar o perfil.")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketmovies:token")
    const user = localStorage.getItem("@rocketmovies:user")

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export default AuthProvider
