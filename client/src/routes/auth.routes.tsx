import { Route, Routes } from "react-router-dom"

import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}

export default AuthRoutes
