import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Img,
  Box,
  VStack,
} from "@chakra-ui/react"

import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchStart, fetchFail, fetchSuccess } from "../App/Feature/userSlice"
import GoogleAuthBtn from "../components/GoogleAuthBtn"

function SignIn() {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fromdata, setFromData] = useState([])
  console.log(fromdata)

  const handelChange = (e) => {
    setFromData({ ...fromdata, [e.target.name]: e.target.value })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    dispatch(fetchStart())
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fromdata),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(fetchFail())
        toast.error(data.message)
        throw new Error()
      }
      dispatch(fetchFail())
      dispatch(fetchSuccess(data.rest))
      toast.success(data.message)
      navigate("/")
    } catch (e) {
      console.log(`Error while Sign-in api`)
    }
  }
  return (
    <Box py={["15vh", "0vh"]} px={["0vw", "28vw"]}>
      <form type="submit" onSubmit={handelSubmit}>
        <VStack
          maxW="md"
          mx="auto"
          mt={10}
          p={5}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          m={["50", "50"]}
        >
          <VStack>
            <Img
              borderRadius={"full"}
              w={"20"}
              src={
                "https://previews.123rf.com/images/wikagraphic/wikagraphic2102/wikagraphic210207110/164822483-rt-initial-logo-company-name-colored-blue-and-magenta-swoosh-design-isolated-on-white-background.jpg"
              }
            />
          </VStack>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={fromdata.email}
              placeholder="Enter Your Email"
              onChange={handelChange}
            />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={fromdata.password}
              placeholder="Enter Your Password"
              onChange={handelChange}
            />
          </FormControl>

          <FormControl
            width={"100%"}
            display={"flex"}
            mt={"5"}
            justifyContent={"center"}
          >
            <Button type="submit" disabled={loading} w={"full"}>
              {loading ? "Loading..." : "Sign in"}
            </Button>
          </FormControl>
          <GoogleAuthBtn />
          <FormControl width={"100%"} color={"blue"}>
            <Link to={"/sign-up"}>Sign Up</Link>
          </FormControl>
        </VStack>
      </form>
    </Box>
  )
}

export default SignIn
