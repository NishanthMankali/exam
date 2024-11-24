import { Routes, Route } from "react-router-dom"
import './App.css'
import Login from './components/Login'
import RegisterExam from "./components/RegisterExam"

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="RegisterExam" element={<RegisterExam></RegisterExam>}></Route>
      </Routes>
    </>
  )
}

export default App
