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
  Img,
} from "@chakra-ui/react"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiMenuAltLeft } from "react-icons/bi"

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  console.log("This is a currentUser", currentUser)
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
          <DrawerHeader>
            {currentUser ? (
              <Link className="flex" onClick={onClose} to={"/profile"}>
                <Img
                  w={"10"}
                  borderRadius={"full"}
                  src={currentUser.profilepic}
                />
                <h1 className="mx-6 font-semibold text-2xl text-white">
                  Prashant Bhoite
                </h1>
              </Link>
            ) : (
              <Link className="flex" to={"/sign-in"}>
                <Img
                  w={"10"}
                  borderRadius={"full"}
                  src={
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                />
                <h1 className="mx-6 font-semibold text-2xl text-white">
                  Prashant Bhoite
                </h1>
              </Link>
            )}
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button onClick={onClose} variant={"ghost"}>
                <Link to={"/"}>Home</Link>
              </Button>

              <Button onClick={onClose} variant={"ghost"}>
                <Link to={"/"}>Tasks</Link>
              </Button>

              <Button onClick={onClose} variant={"ghost"}>
                <Link to={"/recycle-bin"}>Recycle bin</Link>
              </Button>
            </VStack>
            <HStack pos={"absolute"} left={"5"} bottom={"10"}>
              <Button onClick={onClose} variant={"outline"}>
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
