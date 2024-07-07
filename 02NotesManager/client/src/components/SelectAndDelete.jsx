import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { RiAedElectrodesLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { toggleDelete, storeSeachNote } from "../App/Feature/userSlice"
import toast from "react-hot-toast"
function SelectAndDelete() {
  const { deleteToggle } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")

  // console.log(search)
  const handelSearch = async (e) => {
    e.preventDefault()
    try {
      if (search.trim() === "") {
        setSearch("")
        return toast.error("Enter valid input here")
      }
      const res = await fetch(
        `/api/thinks/searchNote?title=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
      const data = await res.json()
      console.log("This is data", data)
      setSearch("")
      if (data === "") {
        setSearch("")
        return toast.error(data.message)
      }
      if (data.success === false) {
        setSearch("")
        toast.error(data.message)
        throw new Error()
      }

      setSearch((prev) => "")
    } catch (e) {
      toast.error(e)
    }
  }
  return (
    <>
      <HStack
        h={"50"}
        w={"full"}
        display={"flex"}
        justifyContent={"space-between"}
        mt={"30"}

        // bg={"red"}
      >
        <VStack>
          <FormControl display={"flex"}>
            <Input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              ml={"4"}
              placeholder="Search Notes here..."
            />
            <Button
              type="submit"
              onClick={handelSearch}
              ml={"2"}
              variant={"outline"}
            >
              Search
            </Button>
          </FormControl>
        </VStack>

        <VStack>
          {deleteToggle ? (
            <Button mr={"10"} onClick={(e) => dispatch(toggleDelete())}>
              <MdDelete />
            </Button>
          ) : (
            <Button mr={"10"} onClick={(e) => dispatch(toggleDelete())}>
              <RiAedElectrodesLine />
            </Button>
          )}
        </VStack>
      </HStack>
    </>
  )
}

export default SelectAndDelete
