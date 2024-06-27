import React from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../App/Feature//TodoSlice"

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  console.log("current user", currentUser)

  const handelDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }

      dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handelLogout = async (e) => {
    e.preventDefault()
    console.log("button ckick")
    try {
      const res = await fetch("/api/user/logout")
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      console.log(data)
      dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          title="logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Email"
                defaultValue={currentUser.name}
                readOnly
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                type="email"
                defaultValue={currentUser.email}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              //   disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {/* {loading ? `LOADING...` : `Sign in`} */}
              Update Profile
            </button>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handelDelete}
              type="button"
              className="bg-red-600 text-white p-1 px-3 text-sm font-semibold rounded-xl"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handelLogout}
              className="bg-green-600 text-white p-1 px-3 text-sm font-semibold rounded-xl"
            >
              Logout
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  )
}

export default Profile
