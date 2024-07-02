import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Img,
  Box,
  VStack,
} from "@chakra-ui/react"

function SignUp() {
  const [loading, setloading] = useState(false)
  const [fromdata, setFromData] = useState("")

  const handelChange = (e) => {
    setFromData({ ...fromdata, [e.target.name]: e.target.value })
  }
  const handelSubmit = async () => {
    try {
      const res= await fetch()
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
              placeContent="Enter Your Name"
            />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handelChange}
              type="text"
              placeContent="Enter Your Email"
            />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={handelChange}
              type="text"
              placeContent="Enter Your Password"
            />
          </FormControl>

          <FormControl
            width={"100%"}
            display={"flex"}
            mt={"5"}
            justifyContent={"center"}
          >
            <Button type="submit" w={"full"}>
              Sign Up
            </Button>
          </FormControl>

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
