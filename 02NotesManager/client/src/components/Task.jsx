import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  FormLabel,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  ModalBody,
  Input,
  Textarea,
  ModalFooter,
  SimpleGrid,
} from "@chakra-ui/react"

import { MdDelete } from "react-icons/md"
import { FaEdit, FaRoad } from "react-icons/fa"


function Task({ todos }) {

  const { deleteToggle } = useSelector((state) => state.user)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [update, setUpdate] = useState([])
  const [setdelete, setnewdelete] = useState(false)

  const [multipaledelete, setMultipaldelete] = useState([])

  console.log(multipaledelete)
  const handelChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }

  const handelUpdate = async () => {
    try {
      const res = await fetch(`/api/thinks/updateNote/${todos._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: update.title,
          description: update.description,
        }),
      })
      const data = await res.json()
      setnewdelete(data.notesUpdated)
      if (data.success === false) {
        toast.error(data.message)
        throw new Error()
      }
      onClose()
      console.log("this is data", data)
      toast.success(data.message)
    } catch (e) {
      toast.error(`error while update:${e}`)
    }
  }

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardHeader
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            w={"full"}
            height={"10"}
            bg={"grey"}
          >
            {deleteToggle ? (
              <input
                type="checkbox"
                w={"20"}
                name="checkbox"
                defaultChecked={setdelete.isComplete}
                onChange={() => setMultipaldelete(todos._id)}
              />
            ) : (
              <Button onClick={onOpen} type="button" outline={"none"}>
                <FaEdit />
              </Button>
            )}
          </CardHeader>
          <CardHeader>
            <Heading size="md">{todos.title} </Heading>
          </CardHeader>
          <CardBody>
            <FormLabel color={"yellow"}>Description</FormLabel>
            <Text>{todos.description}</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"yellow"}>Update Your Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"yellow"}>Title</FormLabel>
              <Input
                ref={initialRef}
                name="title"
                defaultValue={todos.title}
                placeholder="First name"
                onChange={handelChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"yellow"}>Description</FormLabel>
              <Textarea
                placeholder="Description"
                name="description"
                defaultValue={todos.description}
                onChange={handelChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handelUpdate}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Task
