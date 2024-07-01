import React, { useState } from "react"
import { toast } from "react-hot-toast"

function Home() {
  const [input, setInput] = useState()
  console.log(input)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() === "") {
      toast.error("Enter Valid Input")
    } else {
      try {
        const res = await fetch("/api/task/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ tittle: input }),
        })
        const data = await res.json()

        if (data.success === false) {
          toast.error(data.message)
          throw new Error(data.message)
        }
        toast.success(data.message)
        setInput("")
      } catch (e) {
        toast.error(e.message)
      }
    }
  }
  return (
    <div className="flex justify-center items-center px-40 w-full bg-gray-300 h-[75vh] py-2">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Write Todo..."
          className=" border w-full text-black font-semibold rounded-l-lg  min-w-96 px-5 outline-none duration-150 bg-white/20 "
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-2 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </form>
    </div>
  )
}
export default Home
