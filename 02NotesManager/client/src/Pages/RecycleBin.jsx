import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { CgAdd } from "react-icons/cg"
import { FaTrashRestoreAlt } from "react-icons/fa"
import { MdRestorePage } from "react-icons/md"
import { MdDeleteForever } from "react-icons/md"
import { RiAedElectrodesLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { toggleDelete } from "../App/Feature/userSlice"
import Task from "../components/Task"
import TaskResycalBin from "../components/TaskResycalBin"
import toast from "react-hot-toast"

function RecycleBin() {
  const dispatch = useDispatch()
  const { deleteToggle } = useSelector((state) => state.user)
  const [todos, setTodos] = useState([])
  const [selectedNotes, setSelectedNotes] = useState([])
  const [search, setSearch] = useState("")
  const [getsearch, setgetsearch] = useState([])

  const handeldelete = async () => {
    try {
      if (selectedNotes.length === 0) {
        toast.error("You can Chooise frist notes")
        dispatch(toggleDelete())
        return
      }
      const res = await fetch("/api/thinks/multipaldelnotes", {
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
        throw new Error(data.message)
      }
      dispatch(toggleDelete())
      toast.success(data.message)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handelSearch = async () => {
    try {
      if (search.trim() === "") {
        toast.error("Enter a valid input for search")
        return
      }
      const res = await fetch(
        `/api/thinks/searchNote?title=${encodeURIComponent(search)}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      const data = await res.json()
      console.log(data)
      if (Array.isArray(data) && data.length === 0) {
        toast.error("notes Note found that title")
        setSearch([])
      } else {
        setgetsearch(data)
        setSearch([])
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e)
    }
  }

  const handelRestore = async () => {
    try {
      if (selectedNotes.length === 0) {
        toast.error("No Notes Available for Restore ")
        return
      }
      const res = await fetch("/api/thinks/restoreNote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idx: selectedNotes }),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      toast.success(data.message)
      dispatch(toggleDelete())
    } catch (e) {
      toast.error(e)
    }
  }
  useEffect(() => {
    fetch("/api/thinks/getAllNote", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((e) => {
        toast.error(`Error ${e}`)
      })
  }, [todos, search, getsearch, selectedNotes])

  const toggleSelectNote = (noteId) => {
    setSelectedNotes((prevSelected) =>
      prevSelected.includes(noteId)
        ? prevSelected.filter((id) => id !== noteId)
        : [...prevSelected, noteId]
    )
  }
  return (
    <>
      <div className="text-center text-4xl font-semibold mt-3 text-gray-300 text-pretty ">
        RESYCAL_<span className="text-orange-500 italic">BIN</span>
      </div>
      <HStack h={"50"} w={"full"} justifyContent={"space-between"} mt={"30"}>
        <VStack>
          <FormControl display={"flex"}>
            <Input
              borderColor={"lightgreen"}
              type="text"
              fontStyle={"oblique"}
              fontWeight={"600"}
              onChange={(e) => setSearch(e.target.value)}
              ml={"4"}
              placeholder="Search Notes here..."
            />
            <Button
              type="submit"
              borderColor={"lightgreen"}
              ml={"2"}
              onClick={handelSearch}
              variant={"outline"}
            >
              Search
            </Button>
          </FormControl>
        </VStack>

        <HStack gap={"0"}>
          <Button
            mr={"5"}
            onClick={handelRestore}
            variant={"outline"}
            borderColor={"aqua"}
          >
            <MdRestorePage />
          </Button>
          {deleteToggle ? (
            <Button
              mr={"10"}
              variant={"outline"}
              onClick={handeldelete}
              borderColor={"red"}
            >
              <FaTrashRestoreAlt />
            </Button>
          ) : (
            <Button
              mr={"10"}
              variant={"outline"}
              borderColor={"red"}
              onClick={() => dispatch(toggleDelete())}
            >
              <RiAedElectrodesLine />
            </Button>
          )}
        </HStack>
      </HStack>

      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        mt={"10"}
      >
        {getsearch.length > 0
          ? getsearch.map((todo, index) => {
              if (todo.isComplete === false) {
                return null
              }
              return (
                <div className="w-[24rem] mx-4 mt-7" key={index}>
                  <TaskResycalBin
                    todo={todo}
                    toggleSelectNote={toggleSelectNote}
                    isSelected={selectedNotes.includes(todo._id)}
                  />
                </div>
              )
            })
          : todos.map((todo, index) => {
              if (todo.isComplete === false) {
                return null
              }
              return (
                <div className="w-[24rem] mx-4 mt-7" key={index}>
                  <TaskResycalBin
                    todo={todo}
                    toggleSelectNote={toggleSelectNote}
                    isSelected={selectedNotes.includes(todo._id)}
                  />
                </div>
              )
            })}
        {}
      </Box>
    </>
  )
}

export default RecycleBin
