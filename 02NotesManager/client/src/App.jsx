import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"
import Header from "./components/Header"
import RecycleBin from "./Pages/RecycleBin"
import SignIn from "./Pages/SignIn"
import Profile from "./Pages/Profile"
import ProtectRouter from "./components/ProtectRouter"
import AllNotes from "./Pages/AllNotes"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/all-note" element={<AllNotes />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
