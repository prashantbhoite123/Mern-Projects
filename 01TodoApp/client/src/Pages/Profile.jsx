import React, { useState } from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchStart,
  fetchEnd,
  UpdateSuccess,
  logoutUser,
} from "../App/Feature//TodoSlice"

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, loading } = useSelector((state) => state.user)
  const [formData, setFromData] = useState(null)

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value })
  }

  const [istodoEdatable, setTodoEditable] = useState(false)

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

  const handelUpdate = async (e) => {
    e.preventDefault()
    dispatch(fetchStart())

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        toast.error(data.message)
        dispatch(fetchEnd())
        throw new Error()
      }
      dispatch(UpdateSuccess(data.rest))
      dispatch(fetchEnd())
      console.log("ok")
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      {istodoEdatable ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              title="logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
              Update
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    defaultValue={currentUser.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  onClick={handelUpdate}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {loading ? `LOADING...` : `Save`}
                </button>
              </div>

              <hr />
            </form>
            <div>
              <button
                //   disabled={loading}
                type="button"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto rounded-full"
              src={currentUser.profilePic}
              alt="Your Company"
              title="logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
              Profile
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
                    readOnly
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => setTodoEditable(true)}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  Update Profile
                </button>
              </div>

              <hr />
            </form>
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
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
