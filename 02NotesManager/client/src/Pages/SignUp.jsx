import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Img,
  Box,
  VStack,
} from "@chakra-ui/react"
import GoogleAuthBtn from "../components/GoogleAuthBtn"

function SignUp() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [fromdata, setFromData] = useState([])
  const handelChange = (e) => {
    setFromData({ ...fromdata, [e.target.name]: e.target.value })
  }
  console.log(fromdata)
  const handelSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fromdata),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        setloading(false)
        throw new Error()
      }

      toast.success(data.message)
      setloading(false)
      navigate("/sign-in")

      console.log(data)
    } catch (e) {
      toast.error(e.message)
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
            <FormLabel>Name</FormLabel>
            <Input
              onChange={handelChange}
              type="text"
              value={fromdata.name}
              name="name"
              placeholder="Enter Your Name"
            />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handelChange}
              type="email"
              value={fromdata.email}
              name="email"
              placeholder="Enter Your Email"
            />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              color={"white"}
              onChange={handelChange}
              type="password"
              value={fromdata.password}
              name="password"
              placeholder={"Enter Your Password"}
            />
          </FormControl>

          <FormControl
            width={"100%"}
            display={"flex"}
            mt={"5"}
            justifyContent={"center"}
          >
            <Button disabled={loading} type="submit" w={"full"}>
              {loading ? "Loading.." : "Sign-Up"}
            </Button>
          </FormControl>
          <GoogleAuthBtn />
          <FormControl width={"100%"} color="blue">
            <Link mx={"40"} to={"/sign-in"}>
              Sign in
            </Link>
          </FormControl>
        </VStack>
      </form>
    </Box>
  )
}

export default SignUp
