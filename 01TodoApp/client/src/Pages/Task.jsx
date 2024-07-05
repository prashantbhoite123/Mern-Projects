import React, { useState } from "react"
import { useEffect } from "react"
import TodoItem from "../Components/TodoItem"
import "../Styles/App.scss"

function Task() {
  const [todoarr, settodoarr] = useState([])

  console.log(todoarr)
  useEffect(() => {
    fetch("/api/task/getallTask", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => settodoarr(data.allTask))
      .catch((err) => console.log(`Error:`, err))
  }, [todoarr])

  return (
    <>
      {todoarr.length !== 0 ? (
        <div className="todo-container h-[75vh] overflow-scroll overflow-x-hidden bg-gray-600">
          <div className="flex flex-col justify-center items-center">
            {todoarr.map((todo) => (
              <div key={todo._id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-black flex justify-center items-center h-[75vh] bg-gray-300">
          <img
            className="w-[40vh] h-[40vh]"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-saying-no-4637841-3864087.png?f=webp"
            alt=""
          />
        </div>
      )}
    </>
  )
}

export default Task
