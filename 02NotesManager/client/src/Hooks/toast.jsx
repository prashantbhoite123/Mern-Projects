import { useToast } from "@chakra-ui/react"
export const BottomShow = () => {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  )
}

export const PositionExample = () => {
  const toast = useToast()
  const positions = [
    "top",
    "top-right",
    "top-left",
    "bottom",
    "bottom-right",
    "bottom-left",
  ]

  return (
    <Wrap>
      {positions.map((position, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${position} toast`,
                position: position,
                isClosable: true,
              })
            }
          >
            Show {position} toast
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  )
}
