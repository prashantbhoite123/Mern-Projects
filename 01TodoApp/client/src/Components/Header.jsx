import React from "react"
import { Link } from "react-router-dom"
import "../Styles/Header.scss"
import "../App.css"
import { useSelector } from "react-redux"

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="flex text-white justify-between gap-x-2 items-center bg-pink-600 w-full">
      <div className="navlogo font-bold text-2xl text-white px-2">
        Task Manager
      </div>
      <div className="navitems flex font-bold">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/task"}>
          <li>Task</li>
        </Link>
        {currentUser ? (
          <Link to={"/profile"} className="mx-3">
            <img
              src={currentUser.profilePic}
              alt=""
              className="w-10 h-auto rounded-full px-2"
            />
          </Link>
        ) : (
          <Link to={"/sign-in"}>
            <li>Sign In</li>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
