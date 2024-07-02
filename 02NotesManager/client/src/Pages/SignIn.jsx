import React from "react"
import { Link } from "react-router-dom"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Img,
  Box,
  VStack,
} from "@chakra-ui/react"
function SignIn() {
  return (
    <Box py={["15vh", "0vh"]} px={["0vw", "28vw"]}>
      <form type="submit">
        <VStack
          maxW="md"
          mx="auto"
          mt={10}
          p={5}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          m={["50", "50"]}
        >
          <VStack>
            <Img
              borderRadius={"full"}
              w={"20"}
              src={
                "https://previews.123rf.com/images/wikagraphic/wikagraphic2102/wikagraphic210207110/164822483-rt-initial-logo-company-name-colored-blue-and-magenta-swoosh-design-isolated-on-white-background.jpg"
              }
            />
          </VStack>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="text" placeContent="Enter Your Email" />
          </FormControl>

          <FormControl width={"100%"} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="text" placeContent="Enter Your Password" />
          </FormControl>

          <FormControl
            width={"100%"}
            display={"flex"}
            mt={"5"}
            justifyContent={"center"}
          >
            <Button type="submit" w={"full"}>
              Sign in
            </Button>
          </FormControl>

          <FormControl width={"100%"} color={"blue"}>
            <Link to={"/sign-up"}>Sign Up</Link>
          </FormControl>
        </VStack>
      </form>
    </Box>
  )
}

export default SignIn
