import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { toggleDelete } from "../App/Feature/userSlice"
import { restorenots } from "../App/Feature/restore"
import { BottomShow } from "../Hooks/toast"
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
  HStack,
  VStack,
} from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { CgAdd } from "react-icons/cg"

import { useEffect } from "react"
import Task from "../components/Task"
import { RiAedElectrodesLine } from "react-icons/ri"

function AllNotes() {
  const dispatch = useDispatch()
  const { deleteToggle } = useSelector((state) => state.user)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [notes, setNotes] = useState([])

  const [todos, setTodos] = useState([])
  // console.log(todos)
  const [search, setSearch] = useState("")
  const [searchval, setSearchVal] = useState([])
  const [selectedNotes, setSelectedNotes] = useState([])
  const handelChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value })
  }

  const handelNotesApi = async (e) => {
    e.preventDefault()
    try {
      if (notes.title.trim() === "" || notes.description.trim() === "") {
        toast.error("Please enter both title and description")
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
      } else {
        toast.success(data.message)
      }
      onClose()
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetch("/api/thinks/getAllNote", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        toast.error(`Error fetching notes: ${error}`)
      })
  }, [todos, searchval, search, notes])

  const handelSearch = async (e) => {
    e.preventDefault()
    try {
      if (search.trim() === "") {
        toast.error("Enter a valid input for search")
        return
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
      if (Array.isArray(data) && data.length === 0) {
        toast.error("No notes found with that title")
        setSearch("")
      } else {
        setSearchVal(data)
        setSearch("")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handeldelete = async () => {
    try {
      if (selectedNotes.length === 0) {
        toast.error("No Notes Available ")
        dispatch(toggleDelete())
        return
      }
      const res = await fetch("/api/thinks/deleteAndSroreRebin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids: selectedNotes }),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
      }
      toast.success(data.message)
      dispatch(toggleDelete())
    } catch (e) {
      toast.error(e.message)
    }
  }

  const toggleSelectNote = (noteId) => {
    setSelectedNotes((prevSelected) =>
      prevSelected.includes(noteId)
        ? prevSelected.filter((id) => id !== noteId)
        : [...prevSelected, noteId]
    )
  }

  const handelShort = async () => {
    try {
      const res = await fetch("/api/thinks/shortNotes", {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()
      console.log(data)
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <>
      <div className="flex justify-center text-4xl mt-2 text-gray-300 font-semibold">
        <span className="text-orange-500 italic">All</span>-Notes
      </div>
      <HStack h={"50"} w={"full"} justifyContent={"space-between"} mt={"30"}>
        <VStack>
          <FormControl display={"flex"}>
            <Input
              borderColor={"lightgreen"}
              type="text"
              fontStyle={"oblique"}
              fontWeight={"600"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ml={"4"}
              placeholder="Search Notes here..."
            />
            <Button
              type="submit"
              onClick={handelSearch}
              borderColor={"lightgreen"}
              ml={"2"}
              variant={"outline"}
            >
              Search
            </Button>
          </FormControl>
        </VStack>

        <HStack display={"flex"} justifyContent={"sp"}>
          <Button
            variant={"outline"}
            borderColor={"aqua"}
            onClick={handelShort}
          >
            Short
          </Button>
          {deleteToggle ? (
            <Button
              mr={"10"}
              variant={"outline"}
              borderColor={"red"}
              onClick={handeldelete}
            >
              <MdDelete />
            </Button>
          ) : (
            <Button
              mr={"10"}
              variant={"outline"}
              borderColor={"orange"}
              onClick={(e) => dispatch(toggleDelete())}
            >
              <RiAedElectrodesLine />
            </Button>
          )}
        </HStack>
      </HStack>
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
          <ModalHeader color={"orange"}>Add Your Things</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"aqua"}>Title</FormLabel>
              <Input
                borderColor={"lightgreen"}
                fontWeight={"500"}
                fontStyle={"oblique"}
                ref={initialRef}
                name="title"
                placeholder="Enter Title...."
                onChange={handelChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"aqua"}>Description</FormLabel>
              <Textarea
                borderColor={"lightgreen"}
                fontWeight={"500"}
                fontStyle={"oblique"}
                placeholder="Enter description...."
                name="description"
                onChange={handelChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="orange"
              mr={3}
              onClick={handelNotesApi}
            >
              Save
            </Button>
            <Button onClick={onClose} variant={"outline"} borderColor={"red"}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        mt={"10"}
      >
        {searchval.length > 0
          ? searchval.map((todo, index) => {
              if (todo.isComplete === true) {
                return null
              }
              return (
                <div className="w-[24rem] mx-4 mt-7" key={index}>
                  <Task
                    todos={todo}
                    toggleSelectNote={toggleSelectNote}
                    isSelected={selectedNotes.includes(todo._id)}
                  />
                </div>
              )
            })
          : todos.map((todo, index) => {
              if (todo.isComplete === true) {
                return null
              }
              return (
                <div className="w-[24rem] mx-4 mt-7" key={index}>
                  <Task
                    todos={todo}
                    toggleSelectNote={toggleSelectNote}
                    isSelected={selectedNotes.includes(todo._id)}
                  />
                </div>
              )
            })}
      </Box>
    </>
  )
}

export default AllNotes
