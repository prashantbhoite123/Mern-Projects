import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { CgAdd } from "react-icons/cg"
import { FaTrashRestoreAlt } from "react-icons/fa"
import { MdRestorePage } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import { toggleDelete } from "../App/Feature/userSlice"
import Task from "../components/Task"
import TaskResycalBin from "../components/TaskResycalBin"

function RecycleBin() {
  const dispatch = useDispatch()
  const { deleteToggle } = useSelector((state) => state.user)
  const { restroearr } = useSelector((state) => state.restore)
  console.log("This is the restore arr", restroearr)

  return (
    <>
      <div className="text-center text-white text-4xl">RecycleBin</div>
      <HStack h={"50"} w={"full"} justifyContent={"space-between"} mt={"30"}>
        <VStack>
          <FormControl display={"flex"}>
            <Input
              type="text"
              // onChange={(e) => setSearch(e.target.value)}
              ml={"4"}
              placeholder="Search Notes here..."
            />
            <Button type="submit" ml={"2"} variant={"outline"}>
              Search
            </Button>
          </FormControl>
        </VStack>

        <HStack gap={"0"}>
          <Button mr={"5"} variant={"outline"} borderColor={"aqua"}>
            <MdRestorePage />
          </Button>
          <Button mr={"10"} variant={"outline"} borderColor={"red"}>
            <FaTrashRestoreAlt />
          </Button>
        </HStack>
      </HStack>

      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        mt={"10"}
      >
        {restroearr.map((todo, index) => (
          <div className="w-[24rem] mx-4 mt-7" key={index}>
            <TaskResycalBin todo={todo} />
          </div>
        ))}
      </Box>
    </>
  )
}

export default RecycleBin
