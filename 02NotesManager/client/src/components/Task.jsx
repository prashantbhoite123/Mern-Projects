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
import { MdPushPin } from "react-icons/md"
import { RiUnpinFill } from "react-icons/ri"

function Task({ todos, toggleSelectNote, isSelected }) {
  const dispatch = useDispatch()
  const { deleteToggle } = useSelector((state) => state.user)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [update, setUpdate] = useState([])

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
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/thinks/deleteNote/${todos._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(`Error deleting note: ${error.message}`)
    }
  }

  const cardStyle = () => {}
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card
          bg={"wheat"}
          variant={"outline"}
          rounded={"20"}
          borderColor={"lightseagreen"}
        >
          <CardHeader
            rounded={"20"}
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            w={"full"}
            height={"10"}
            bg={"orange"}
          >
            <Button
              rounded={"full"}
              fontSize={"24"}
              color={"black"}
              type="button"
            >
              <MdPushPin />
            </Button>

            {deleteToggle ? (
              <input
                type="checkbox"
                w={"20"}
                name="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectNote(todos._id)}
              />
            ) : (
              <Button
                onClick={onOpen}
                variant={"outline"}
                rounded={"full"}
                color={"black"}
                type="button"
                outline={"none"}
              >
                <FaEdit />
              </Button>
            )}
          </CardHeader>
          <CardHeader>
            <FormLabel color={"blue"}>Tittle</FormLabel>
            <Heading
              color={"black"}
              fontSize={"24"}
              fontStyle={"italic"}
              textAlign={"center"}
              size="md"
            >
              {todos.title}
            </Heading>
          </CardHeader>
          <CardBody>
            <FormLabel color={"blue"}>Description :-</FormLabel>
            <Text fontSize={"20"} color={"black"} fontWeight={"500"}>
              {todos.description}
            </Text>
          </CardBody>
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
