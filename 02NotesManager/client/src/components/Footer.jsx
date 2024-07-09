import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaHome } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa6"
import { MdDeleteSweep } from "react-icons/md"
function Footer() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <>
      <HStack
        h={"70"}
        bg={"gray"}
        mt={"10"}
        w={"full"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <HStack fontSize={["10", "30"]}>
          <img
            className="w-10 rounded-full"
            src="https://previews.123rf.com/images/wikagraphic/wikagraphic2102/wikagraphic210207110/164822483-rt-initial-logo-company-name-colored-blue-and-magenta-swoosh-design-isolated-on-white-background.jpg"
            alt=""
          />
          <div>
            <span className="italic text-yellow-400"> REAL_</span>THINKER
          </div>
        </HStack>
        {
          <Box>
            <VStack>
              {currentUser ? (
                <HStack>
                  <Button
                    color={"black"}
                    gap={"3"}
                    variant={"outline"}
                    borderColor={"orange"}
                  >
                    <FaGithub />
                    <Link
                      className="font-semibold"
                      to={"https://github.com/prashantbhoite123"}
                    >
                      GITHUB
                    </Link>
                  </Button>
                  <Button
                    color={"black"}
                    gap={"3"}
                    variant={"outline"}
                    borderColor={"skyblue"}
                  >
                    <FaLinkedin />
                    <Link
                      className="font-semibold"
                      to={
                        "/https://www.linkedin.com/in/prashant-bhoite-59856a2a5/"
                      }
                    >
                      LINKEDIN
                    </Link>
                  </Button>
                </HStack>
              ) : (
                <HStack>
                  <Button variant={"outline"} borderColor={"skyblue"}>
                    <Link to={"/sign-in"}>SIGN-IN</Link>
                  </Button>
                  <Button variant={"outline"} borderColor={"skyblue"}>
                    <Link to={"/sign-up"}>SIGN-UP</Link>
                  </Button>
                </HStack>
              )}
            </VStack>
          </Box>
        }
      </HStack>
    </>
  )
}

export default Footer
