import React, { useEffect } from "react"
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
import { FaEdit } from "react-icons/fa"

function TaskResycalBin({ todo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
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
          {/* {deleteToggle ? (
            <input
              type="checkbox"
              w={"20"}
              name="checkbox"
              //   checked={isSelected}
              //   onChange={() => toggleSelectNote(todos._id)}
            />
          ) : ( */}
          <Button onClick={onOpen} type="button" outline={"none"}>
            <FaEdit />
          </Button>
          {/* )} */}
        </CardHeader>
        <CardHeader>
          <Heading size="md">{todo.title}</Heading>
        </CardHeader>
        <CardBody>
          <FormLabel color={"yellow"}>Description</FormLabel>
                  <Text>{ todo.description}</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  )
}

export default TaskResycalBin
