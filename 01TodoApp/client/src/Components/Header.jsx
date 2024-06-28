import React from "react"
import { Link } from "react-router-dom"
import "../Styles/Header.scss"
import "../App.css"
import { useSelector } from "react-redux"

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="flex justify-between items-center bg-pink-600">
      <div className="navlogo font-bold text-xl px-2">Task Manager</div>
      <div className="navitems flex font-bold">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/task"}>
          <li>Task</li>
        </Link>
        {currentUser ? (
          <Link to={"/profile"}>
            <img
              src={currentUser.profilePic}
              alt=""
              className="w-10 h-auto rounded-full px-2"
            />
          </Link>
        ) : (
          <Link to={"/sign-up"}>
            <li>Sign Up</li>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
