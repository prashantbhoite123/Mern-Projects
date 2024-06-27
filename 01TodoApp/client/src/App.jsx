import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Header from "./Components/Header"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import Task from "./Pages/Task"
import Profile from "./Pages/Profile"
import ProtectRouter from "./Components/ProtectRouter"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sing-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
