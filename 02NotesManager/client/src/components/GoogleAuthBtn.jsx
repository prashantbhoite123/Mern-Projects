import React from "react"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Button, FormControl, HStack, Img } from "@chakra-ui/react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../../firebase"
import { fetchStart, fetchFail, fetchSuccess } from "../App/Feature/userSlice"

function GoogleAuthBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.user)

  const handelClick = async () => {
    dispatch(fetchStart())
    try {
      const Provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, Provider)
      const user = result.user
      console.log("This is result", result)

      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profilepic: user.photoURL,
        }),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(fetchFail())
        toast.error(data.message)
        throw new Error("")
      }
      console.log(data)
      dispatch(fetchSuccess(data))
      toast.success(`Wellcome :${data.name}`)
      navigate("/")
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <FormControl
      width={"100%"}
      display={"flex"}
      mt={"5"}
      justifyContent={"center"}
    >
      <Button disabled={loading} onClick={handelClick} type="submit" w={"full"}>
        <HStack>
          <Img
            w={"5"}
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
          />
          <Box>{loading ? "Loading.." : "Continue with Google"}</Box>
        </HStack>
      </Button>
    </FormControl>
  )
}

export default GoogleAuthBtn
