import { Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import MoviePreview from "../pages/MoviePreview"
import New from "../pages/New"
import Profile from "../pages/Profile"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MoviePreview />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default AppRoutes
