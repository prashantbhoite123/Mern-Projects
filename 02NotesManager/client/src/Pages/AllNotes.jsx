import React, { useState } from "react"
import { toast } from "react-hot-toast"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  useDisclosure,
  Box,
} from "@chakra-ui/react"

import { CgAdd } from "react-icons/cg"
import { useEffect } from "react"
import Task from "../components/Task"
import SelectAndDelete from "../components/SelectAndDelete"
// import EditModel from "../components/EditModel"
function AllNotes() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [notes, setNotes] = useState([])
  const [todos, setTodos] = useState([])
  // console.log(todos)

  // console.log(notes)
  const handelChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value })
  }

  const handelNotesApi = async (e) => {
    e.preventDefault()
    try {
      if (notes.title.trim() === "") {
        toast.error("Enter Your Tak here ..")
        return
      }
      if (notes.description.trim() === "") {
        toast.error("Enter Your Tak here ..")

        return
      }
      const res = await fetch("/api/thinks/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(notes),
      })

      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        onClose()
      }
      toast.success(data.message)
      onClose()
    } catch (e) {
      toast.error(e.message)
    }
  }

  useEffect(() => {
    fetch("/api/thinks/getAllNote", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((e) => console.log(`Error ${e}`))
  }, [todos])
  // console.log(todos)
  return (
    <>
      <div className="flex justify-center text-4xl">All Notes</div>
      <SelectAndDelete />
      <Box mt={"10"}>
        <Button
          variant={"none"}
          onClick={onOpen}
          color={"white"}
          fontSize={"50"}
          borderRadius={"100%"}
          background={"none"}
          pos={"fixed"}
          zIndex={"1"}
        >
          <CgAdd />
        </Button>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"yellow"}>Add Your Thinks</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"yellow"}>Title</FormLabel>
              <Input
                ref={initialRef}
                name="title"
                placeholder="First name"
                onChange={handelChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"yellow"}>Description</FormLabel>
              <Textarea
                placeholder="Description"
                name="description"
                onChange={handelChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handelNotesApi}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
        {todos.map((todo, index) => (
          <div className="w-[24rem] mx-4  mt-7 " key={index}>
            <Task todos={todo} />
          </div>
        ))}
      </Box>
    </>
  )
}

export default AllNotes
