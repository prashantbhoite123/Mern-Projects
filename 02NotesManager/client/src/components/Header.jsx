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
  VStack,
  HStack,
  Img,
  Box,
  Text,
} from "@chakra-ui/react"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiMenuAltLeft } from "react-icons/bi"

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  // console.log("This is a currentUser", currentUser)
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
        zIndex={"10"}
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
                <h1 className="mx-6 font-bold  text-2xl text-red-300 ">
                  {currentUser.name}
                </h1>
              </Link>
            ) : (
              <Link className="flex" to={"/sign-in"}>
                <Button onClick={onClose}>Sign In</Button>
              </Link>
            )}
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button onClick={onClose} variant={"ghost"}>
                <Link to={"/"}>All Notes</Link>
              </Button>

              <Button onClick={onClose} variant={"ghost"}>
                <Link to={"/recycle-bin"}>Recycle bin</Link>
              </Button>
            </VStack>
            <HStack pos={"absolute"} left={"5"} bottom={"10"}>
              {currentUser ? (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Img
                    w={"12"}
                    borderRadius={"full"}
                    src="https://previews.123rf.com/images/wikagraphic/wikagraphic2102/wikagraphic210207110/164822483-rt-initial-logo-company-name-colored-blue-and-magenta-swoosh-design-isolated-on-white-background.jpg"
                  />

                  <Text fontSize={"25"} fontWeight={"bold"} mx={"5"}>
                    REAL THINKAR
                  </Text>
                </Box>
              ) : (
                <Button onClick={onClose} variant={"outline"}>
                  <Link to={"/sign-Up"}>Sign Up</Link>
                </Button>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header
