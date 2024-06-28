import React from "react"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../firebase"
import { fetchStart, fetchEnd, fetchSuccess } from "../App/Feature/TodoSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

function GoogleAuthBtn() {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleAuth = async (e) => {
    e.preventDefault()
    dispatch(fetchStart())
    const Provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth, Provider)
    const user = result.user
    const res = await fetch("/api/user/googleAuth", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
      }),
    })
    const data = await res.json()
    if (data.success === false) {
      toast.error(data.message)
      throw new Error()
      dispatch(fetchEnd())
    }
    dispatch(fetchSuccess(data))
    toast.success(data.message)
    navigate("/")
  }
  return (
    <div>
      <button
        disabled={loading}
        onClick={handleGoogleAuth}
        type="submit"
        className="flex w-full  justify-center items-center rounded-md bg-gray-200 px-3 py-1.5 text-lg font-bold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <img
          className="h-auto w-8 mx-6"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt=""
        />
        <span>{loading ? `LOADING...` : `    Continue with Google`}</span>
      </button>
    </div>
  )
}

export default GoogleAuthBtn
