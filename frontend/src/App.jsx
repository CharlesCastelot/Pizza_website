import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Pizza from "./pages/Pizza"
import Comments from "./pages/Comments"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pizza" element={<Pizza/>} />
        <Route path="/add-comments" element={<Comments/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
