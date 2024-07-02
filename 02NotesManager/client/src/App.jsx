import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"
import Header from "./components/Header"
import RecycleBin from "./Pages/RecycleBin"
import SignIn from "./Pages/SignIn"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/recycle-bin" element={<RecycleBin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
