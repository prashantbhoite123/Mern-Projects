import React from "react"
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  DrawerFooter,
  Stack,
  VStack,
  HStack,
} from "@chakra-ui/react"

import { Link } from "react-router-dom"
import { BiMenuAltLeft } from "react-icons/bi"

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        pos={"fixed"}
        top={"4"}
        left={"4"}
        colorScheme="purple"
        p={"0"}
        w={"10"}
        h={"10"}
        borderRadius={"full"}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notes Maganer</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button variant={"ghost"}>
                <Link to={"/"}>Home</Link>
              </Button>

              <Button variant={"ghost"}>
                <Link to={"/"}>Tasks</Link>
              </Button>

              <Button variant={"ghost"}>
                <Link to={"/recycle-bin"}>Recycle bin</Link>
              </Button>
            </VStack>
            <HStack pos={"absolute"} left={"5"} bottom={"10"}>
              <Button variant={"outline"}>
                <Link to={"/sign-Up"}>Sign Up</Link>
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header
