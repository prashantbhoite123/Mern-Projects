import React, { useState } from "react"
import { toast } from "react-hot-toast"
import "../Styles/App.scss"
import { useSelector } from "react-redux"

function TodoItem({ todo }) {
  // console.log("This is Todo", todo)
  const { currentUser } = useSelector((state) => state.user)
  const [isTodoEditable, setTogglecomplete] = useState(false)

  const [editTodo, setEditTodo] = useState(todo.tittle)
  console.log(editTodo)

  const handleDeleteTodoa = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/task/delete/${todo._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    const data = await res.json()
    if (data.success === false) {
      toast.error(data.message)
      throw new Error()
    }

    toast.success(data.message)

    try {
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handelEdit = async () => {
    try {
      const res = await fetch(`/api/task/editTodo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tittle: editTodo }),
      })
      const data = await res.json()
      setTogglecomplete(false)

      if (data.success === false) {
        throw new Error(data.message)
      }
      toast.success(data.message)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const toggleTodo = async () => {
    const res = await fetch(`/api/task/toggle/${todo._id}`, {
      method: "PUT",
      credentials: "include",
    })
    const data = await res.json()
    if (data.success === false) {
      toast.error(data.message)
      throw new Error()
    }
    toast.success(data.message)
  }

  return (
    <div
      className={` todoitem flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-6 my-2 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.isComplete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        name="checkbox"
        checked={todo.isComplete}
        onChange={toggleTodo}
      />

      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.isComplete ? "line-through" : ""}`}
        value={editTodo}
        defaultValue={todo.tittle}
        onChange={(e) => setEditTodo(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      {/* <button
        onClick={handelEdit}
        disabled={todo.isComplete}
        type="button"
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button> */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.isComplete) return

          if (isTodoEditable) {
            handelEdit()
          } else setTogglecomplete((prev) => !prev)
        }}
        disabled={todo.isComplete}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        onClick={handleDeleteTodoa}
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        type="button"
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
