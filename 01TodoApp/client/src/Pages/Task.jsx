import React, { useState } from "react"
import { useEffect } from "react"
import TodoItem from "../Components/TodoItem"
import "../Styles/App.scss"

function Task() {
  const [todoarr, settodoarr] = useState([])

  useEffect(() => {
    fetch("/api/task/getallTask", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => settodoarr(data.allTask))
      .catch((err) => console.log(`Error:`, err))
  }, [])

  // todoarr.map((todo) => {
  //   console.log(todo)
  // })
  console.log(todoarr)
  return (
    <>
      <div className="todo-container ">
        <div className="flex flex-col justify-center items-center m-auto">
          {todoarr.map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Task
