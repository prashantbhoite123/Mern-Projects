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

import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
  fetchStart,
  fetchFail,
  updateSuccess,
  logoutUser,
} from "../App/Feature/userSlice"
import toast from "react-hot-toast"

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser, loading } = useSelector((state) => state.user)
  const [istaskUpdate, setistaskUpdate] = useState(false)
  const [fromData, setFromData] = useState([])
  console.log(fromData)
  const handelDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
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
      dispatch(logoutUser())
      navigate("/sign-up")
      toast.success(data.message)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handelLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
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
      dispatch(logoutUser())
      toast.success(data.message)
      navigate("/sign-in")
    } catch (e) {
      console.log(`Error While Logout frountend :${e}`)
    }
  }
  const handelChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value })
  }
  const handelUpdate = async (e) => {
    e.preventDefault()
    dispatch(fetchStart())
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fromData),
      })

      const data = await res.json()
      if (data.success === false) {
        dispatch(fetchFail())
        toast.error(data.message)
        throw new Error(data.message)
      }
      dispatch(updateSuccess(data.rest))
      toast.success(data.message)
      setistaskUpdate(false)
      dispatch(fetchFail())
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <>
      {istaskUpdate ? (
        <Box  py={["15vh", "0vh"]} px={["0vw", "28vw"]}>
          <form type="submit">
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
                  src={currentUser.profilepic}
                />
              </VStack>

              <FormControl width={"100%"}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="name"
                  name="name"
                  defaultValue={currentUser.name}
                  placeholder="Enter Your name"
                  onChange={handelChange}
                />
              </FormControl>
              <FormControl width={"100%"}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  defaultValue={currentUser.email}
                  placeholder="Enter Your Email"
                  onChange={handelChange}
                />
              </FormControl>

              <FormControl width={"100%"}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  defaultValue={currentUser.password}
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
                <Button
                  type="button"
                  colorScheme={"green"}
                  onClick={handelUpdate}
                  disabled={loading}
                  w={"full"}
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
              </FormControl>
              <FormControl
                width={"100%"}
                display={"flex"}
                mt={"1"}
                justifyContent={"center"}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  colorScheme="red"
                  w={"full"}
                  onClick={() => setistaskUpdate(false)}
                >
                  Cancel
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Box>
      ) : (
        <Box py={["15vh", "0vh"]} px={["0vw", "28vw"]}>
          <form type="submit">
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
                  src={currentUser.profilepic}
                />
              </VStack>
              <FormControl width={"100%"} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="name"
                  name="name"
                  value={currentUser.name}
                  readOnly
                />
              </FormControl>
              <FormControl width={"100%"} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={currentUser.email}
                  readOnly
                />
              </FormControl>
              <FormControl
                width={"100%"}
                display={"flex"}
                mt={"5"}
                justifyContent={"center"}
              >
                <Button
                  onClick={() => setistaskUpdate(true)}
                  type="submit"
                  w={"full"}
                  colorScheme="blue"
                >
                  Update Profile
                </Button>
              </FormControl>
              <FormControl
                display={"flex"}
                mt={"2"}
                justifyContent={"space-between"}
              >
                <Button
                  onClick={handelDelete}
                  variant={"outline"}
                  colorScheme="red"
                >
                  Delete
                </Button>
                <Button
                  onClick={handelLogout}
                  variant={"outline"}
                  colorScheme="blue"
                >
                  Logout
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Box>
      )}
    </>
  )
}

export default Profile
