import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from "./Pages/Home"
import Header from "./Components/Header"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import Task from "./Pages/Task"
import Profile from "./Pages/Profile"
import ProtectRouter from "./Components/ProtectRouter"
import Footer from "./Components/Footer"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<ProtectRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/task" element={<Task />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
