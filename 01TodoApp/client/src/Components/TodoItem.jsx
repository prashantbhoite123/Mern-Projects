import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"

function TodoItem({ todo }) {
  console.log("This is Todo", todo)
  const { currentUser } = useSelector((state) => state.user)
  const [toggleisComplete, setTogglecomplete] = useState(false)
  console.log(toggleisComplete)
  console.log("This is current user id", currentUser._id)
  const handleDeleteTodoa = async (e) => {
    console.log("Button click")
    e.preventDefault()
    const res = await fetch(`/api/task/delete/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    const data = await res.json()

    console.log(data)
    console.log(data)
    try {
    } catch (e) {
      toast.error(e.message)
    }
  }

  console.log(todo)
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-6 my-2 shadow-sm shadow-white/50 duration-300  text-black ${
        toggleisComplete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        name="checkbox"
        checked={todo.isComplete}
        onChange={() =>
          toggleisComplete === true ? !setTogglecomplete : setTogglecomplete
        }
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg `}
        value={todo.tittle}
        readOnly
      />
      {/* Edit, Save Button */}
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50">
        {/* {isTodoEditable ? "📁" : "✏️"} */}
        ✏️
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
