import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  FormLabel,
  useDisclosure,
  SimpleGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  FormControl,
  Input,
  Textarea,
  ModalFooter,
} from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { MdPushPin } from "react-icons/md"
import { RiUnpinFill } from "react-icons/ri"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

function TaskResycalBin({ todo, toggleSelectNote, isSelected }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const { deleteToggle } = useSelector((state) => state.user)

  const [update, setUpdate] = useState([])
  console.log(update)
  const handelChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }

  const handelUpdate = async () => {
    try {
      const res = await fetch(`/api/thinks/updateNote/${todo._id}`, {
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
      onClose()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      toast.success(data.message)
      console.log(data)
    } catch (e) {
      toast.error(e.message)
    }
  }
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
            display={"flex"}
            justifyContent={"end"}
            rounded={"20"}
            alignItems={"center"}
            bg={"orange"}
            w={"full"}
            height={"10"}
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
                onChange={() => toggleSelectNote(todo._id)}
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
            <FormLabel color={"blue"}>Title</FormLabel>
            <Heading
              color={"black"}
              fontSize={"24"}
              fontStyle={"italic"}
              textAlign={"center"}
              size="md"
            >
              {todo.title}
            </Heading>
          </CardHeader>
          <CardBody>
            <FormLabel color={"blue"}>Description</FormLabel>
            <Text fontSize={"20"} color={"black"} fontWeight={"500"}>
              {todo.description}
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
                defaultValue={todo.title}
                placeholder="First name"
                onChange={handelChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"yellow"}>Description</FormLabel>
              <Textarea
                placeholder="Description"
                name="description"
                defaultValue={todo.description}
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

export default TaskResycalBin
