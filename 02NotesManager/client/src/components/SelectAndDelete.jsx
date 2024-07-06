import React, { useState } from "react"
import { Box, Button, HStack, VStack } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { RiAedElectrodesLine } from "react-icons/ri"
function SelectAndDelete() {
  const [select, setSelect] = useState(false)
  //   console.log(select)
  return (
    <>
      <HStack
        h={"50"}
        w={"full"}
        display={"flex"}
        justifyContent={"flex-end"}
        mt={"30"}
      >
        <VStack>
          {select ? (
            <Button mr={"10"} onClick={(e) => setSelect((prev) => !prev)}>
              <MdDelete />
            </Button>
          ) : (
            <Button mr={"10"} onClick={(e) => setSelect((prev) => !prev)}>
              <RiAedElectrodesLine />
            </Button>
          )}
        </VStack>
      </HStack>
    </>
  )
}

export default SelectAndDelete
